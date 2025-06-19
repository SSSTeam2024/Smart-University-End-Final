const papierAdministratifSchema = require("../../model/PapierAdministratif/PapierAdministratifModel");
const teacherPeriodSchema = require("../../model/TeacherPeriodModel/TeacherPeriodModel");
const enseignantSchema = require("../../model/EnseignantModel/EnseignantModel");
const mongoose = require("mongoose");

function getEnseignantModel(dbConnection) {
  return (
    dbConnection.models.Enseignant ||
    dbConnection.model("Enseignant", enseignantSchema)
  );
}

function getTeacherPeriodtModel(dbConnection) {
  return (
    dbConnection.models.TeacherPeriod ||
    dbConnection.model("TeacherPeriod", teacherPeriodSchema)
  );
}

function getPapierAdministratifModel(dbConnection) {
  return (
    dbConnection.models.PapierAdministratif ||
    dbConnection.model("PapierAdministratif", papierAdministratifSchema)
  );
}

const createEnseignant = async (enseignant, dbName) => {
  console.log("dbName", dbName);
  const Enseignant = await getEnseignantModel(dbName);
  return await Enseignant.create(enseignant);
};

const getEnseignants = async (dbName) => {
  const enseignantModel = await getEnseignantModel(dbName);
  return await enseignantModel
    .find()
    .populate("etat_compte")
    .populate("specilaite")
    .populate("grade")
    .populate("poste")
    .populate("departements")
    .populate({
      path: "historique_positions.poste",
      model: "PosteEnseignant",
    })
    .populate({
      path: "historique_positions.grade",
      model: "GradeEnseignant",
    })

};

const updateEnseignant = async (id, updateData, dbName) => {
  const enseignantModel = await getEnseignantModel(dbName);
  return await enseignantModel.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteEnseignant = async (id, dbName) => {
  const enseignantModel = await getEnseignantModel(dbName);
  return await enseignantModel.findByIdAndDelete(id);
};

const getEnseignantById = async (id, dbName) => {
  try {
    const enseignantModel = await getEnseignantModel(dbName);
    const enseignant = await enseignantModel
      .findById(id)
      .populate("specilaite")
      .populate("grade")
      .populate("poste")
      .populate("departements");
    return enseignant;
  } catch (error) {
    console.error("Error fetching enseignant:", error);
    throw error;
  }
};

const assignPapierToTeacher = async (paperData, teacherId, dbName) => {
  try {
    if (!teacherId || !Array.isArray(paperData) || paperData.length === 0) {
      throw new Error("Invalid input: Teacher ID or paper data");
    }
    const enseignantModel = await getEnseignantModel(dbName);
    const PapierAdministratif = await getPapierAdministratifModel(dbName);
    const paperIds = paperData.map((paper) => {
      if (!paper.papier_administratif) {
        throw new Error("Invalid papier_administratif ID");
      }
      return mongoose.Types.ObjectId(paper.papier_administratif);
    });

    const papiers = await PapierAdministratif.find({
      _id: { $in: paperIds },
    });

    if (papiers.length === 0) {
      throw new Error(
        "No Papier Administratif documents found for the provided IDs"
      );
    }

    const updatedTeacher = await enseignantModel
      .findByIdAndUpdate(
        teacherId,
        { $addToSet: { papers: { $each: paperData } } },
        { new: true }
      )
      .populate("papers.files_papier_administratif");

    return updatedTeacher;
  } catch (error) {
    throw new Error(`DAO Error: ${error.message}`);
  }
};

const fetchAllTeachersPeriods = async (dbName) => {
  try {
    const teacherPeriodModel = await getTeacherPeriodtModel(dbName);
    const teachersPeriods = await teacherPeriodModel
      .find()
      .populate("id_teacher")
      .populate("id_classe_period");

    return teachersPeriods;
  } catch (error) {
    throw new Error(
      "Error fetching teachers' periods from database: " + error.message
    );
  }
};

const getTeachersGroupedByGrade = async (dbName) => {
  try {
    const enseignantModel = await getEnseignantModel(dbName);
    const teachersByGrade = await enseignantModel.aggregate([
      {
        $lookup: {
          from: "gradeenseignants",
          localField: "grade",
          foreignField: "_id",
          as: "GradeDetails",
        },
      },

      {
        $unwind: {
          path: "$GradeDetails",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $group: {
          _id: "$GradeDetails._id",
          gradeLabel: { $first: "$GradeDetails" },
          teachers: {
            $push: {
              id: "$_id",
              fullName: { $concat: ["$prenom_fr", " ", "$nom_fr"] },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          gradeLabel: 1,
          teachers: {
            $filter: {
              input: "$teachers",
              as: "teacher",
              cond: { $ne: ["$$teacher.id", null] },
            },
          },
        },
      },
    ]);

    return teachersByGrade;
  } catch (error) {
    console.error("Error fetching", error);
  }
};

const getTeacherByCIN = async (cin_teacher, dbName) => {
  try {
    const enseignantModel = await getEnseignantModel(dbName);
    const teacher = await enseignantModel.findOne({
      num_cin: cin_teacher,
    });
    return teacher;
  } catch (error) {
    console.error("Error while getting teacher by cin");
    throw error;
  }
};

const updateJwtToken = async (id, token, dbName) => {
  const enseignantModel = await getEnseignantModel(dbName);
  return await enseignantModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        api_token: token,
      },
    }
  );
};

const logoutTeacher = async (teacherId, dbName) => {
  try {
    const enseignantModel = await getEnseignantModel(dbName);
    return await enseignantModel.findByIdAndUpdate(
      teacherId,
      { api_token: null },
      { new: true }
    );
  } catch (error) {
    console.error("Error logging out teacher:", error);
    throw error;
  }
};

module.exports = {
  createEnseignant,
  getEnseignants,
  updateEnseignant,
  deleteEnseignant,
  getEnseignantById,
  assignPapierToTeacher,
  fetchAllTeachersPeriods,
  getTeachersGroupedByGrade,
  getTeacherByCIN,
  updateJwtToken,
  logoutTeacher,
};
