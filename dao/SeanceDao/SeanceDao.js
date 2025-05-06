const seanceSchema = require("../../model/SeancesModel/SeanceModel");

function getSeanceModel(dbConnection) {
  return (
    dbConnection.models.Seance || dbConnection.model("Seance", seanceSchema)
  );
}

const createSeance = async (seance, dbName) => {
  try {
    const seanceModel = await getSeanceModel(dbName);
    return await seanceModel.create(seance);
  } catch (error) {
    console.error("Error creating seance:", error);
    throw error;
  }
};

const getSeances = async (dbName) => {
  try {
    const seanceModel = await getSeanceModel(dbName);
    return await seanceModel
      .find()
      .populate("classe")
      .populate("matiere")
      .populate("enseignant")
      .populate("salle");
  } catch (error) {
    console.error("Error fetching seances:", error);
    throw error;
  }
};

const getSeancesByIdEmploiPeriodique = async (idEmploi, dbName) => {
  try {
    const seanceModel = await getSeanceModel(dbName);
    const query = {
      emploiPeriodique_id: idEmploi,
    };
    return await seanceModel
      .find(query)
      .populate("classe")
      .populate("matiere")
      .populate("enseignant")
      .populate("salle")
      .populate("emploiPeriodique_id");
  } catch (error) {
    console.error("Error fetching seances:", error);
    throw error;
  }
};

const getSeanceByDayAndTime = async (emploiPeriodique_id, day, dbName) => {
  try {
    const seanceModel = await getSeanceModel(dbName);
    const query = {
      jour: day,
      emploiPeriodique_id: emploiPeriodique_id,
    };
    return await seanceModel
      .find(query)
      .populate("classe")
      .populate("matiere")
      .populate("enseignant")
      .populate("salle");
  } catch (error) {
    console.error("Error fetching seances:", error);
    throw error;
  }
};

const updateSeance = async (id, updateData, dbName) => {
  try {
    const seanceModel = await getSeanceModel(dbName);
    return await seanceModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate("classe")
      .populate("matiere")
      .populate("enseignant")
      .populate("salle");
  } catch (error) {
    console.error("Error updating seance:", error);
    throw error;
  }
};

const deleteSeance = async (id, dbName) => {
  try {
    const seanceModel = await getSeanceModel(dbName);
    return await seanceModel.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting seance:", error);
    throw error;
  }
};

const getSeanceById = async (id, dbName) => {
  try {
    const seanceModel = await getSeanceModel(dbName);
    return await seanceModel
      .findById(id)
      .populate("classe")
      .populate("matiere")
      .populate("enseignant")
      .populate("salle");
  } catch (error) {
    console.error("Error fetching seance by ID:", error);
    throw error;
  }
};

const getSeancesByIdTeacher = async (
  teacherId,
  jour,
  emploi_periodique_id,
  dbName
) => {
  try {
    const seanceModel = await getSeanceModel(dbName);
    const query = {
      enseignant: teacherId,
      jour: jour,
      emploiPeriodique_id: emploi_periodique_id,
    };
    return await seanceModel
      .find(query)
      .populate("classe")
      .populate("matiere")
      .populate("enseignant")
      .populate("salle");
  } catch (error) {
    console.error("Error fetching seances:", error);
    throw error;
  }
};

const getPeriodicSessionsByTeacher = async (
  teacherId,
  emploi_periodique_id,
  dbName
) => {
  try {
    const seanceModel = await getSeanceModel(dbName);
    const query = {
      enseignant: teacherId,
      emploiPeriodique_id: emploi_periodique_id,
    };
    return await seanceModel
      .find(query)
      .populate("classe")
      .populate("matiere")
      .populate("enseignant")
      .populate("salle")
      .populate("emploiPeriodique_id");
  } catch (error) {
    console.error("Error fetching seances:", error);
    throw error;
  }
};

const getSessionsByRoomId = async (roomId, dbName) => {
  try {
    const seanceModel = await getSeanceModel(dbName);
    const query = {
      salle: roomId,
    };
    return await seanceModel
      .find(query)
      .populate("classe")
      .populate("matiere")
      .populate("enseignant")
      .populate("salle");
  } catch (error) {
    console.error("Error fetching seances:", error);
    throw error;
  }
};

const getSeancesByTeacher = async (teacherId, semestre, dbName) => {
  try {
    const seanceModel = await getSeanceModel(dbName);
    return await seanceModel
      .find({ enseignant: teacherId, semestre: semestre })
      .populate({
        path: "emploiPeriodique_id",
        match: { etat: "En élaboration" },
      })
      .populate({
        path: "classe",
        populate: {
          path: "parcours",
          populate: {
            path: "modules",
            model: "ModuleParcours",
            populate: {
              path: "matiere",
              model: "Matiere",
            },
          },
        },
      });
  } catch (error) {
    console.error("Error fetching seances:", error);
    throw error;
  }
};

const fetchSeancesByIdTeacherAndSemestre = async (
  enseignantId,
  semestre,
  dbName
) => {
  const seanceModel = await getSeanceModel(dbName);
  return await seanceModel
    .find({ enseignant: enseignantId, semestre })
    .populate("matiere")
    .populate("classe")
    .populate("salle")
    .populate("emploiPeriodique_id")
    .populate("enseignant");
};

module.exports = {
  getSeanceById,
  deleteSeance,
  updateSeance,
  getSeances,
  createSeance,
  getSeancesByIdEmploiPeriodique,
  getSeancesByIdTeacher,
  getSessionsByRoomId,
  getSeanceByDayAndTime,
  getSeancesByTeacher,
  fetchSeancesByIdTeacherAndSemestre,
  getPeriodicSessionsByTeacher,
};
