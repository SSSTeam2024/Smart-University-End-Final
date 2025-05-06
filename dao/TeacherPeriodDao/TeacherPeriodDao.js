const TeacherPeriodSchema = require("../../model/TeacherPeriodModel/TeacherPeriodModel");

function getTeacherPeriodModel(dbConnection) {
  return (
    dbConnection.models.TeacherPeriod ||
    dbConnection.model("TeacherPeriod", TeacherPeriodSchema)
  );
}

const createTeacherPeriod = async (params, dbName) => {
  const teacherPeriodModel = await getTeacherPeriodModel(dbName);
  return await teacherPeriodModel.create(params);
};

const getTeacherPeriod = async (id, semestre, dbName) => {
  const teacherPeriodModel = await getTeacherPeriodModel(dbName);
  const query = {
    id_teacher: id,
    semestre: semestre,
  };
  return await teacherPeriodModel
    .find(query)
    .populate("id_classe_period")
    .populate("id_teacher");
};

const getAllTeacherPeriods = async (dbName) => {
  const teacherPeriodModel = await getTeacherPeriodModel(dbName);
  return await teacherPeriodModel.find();
};

const getTeacherPeriodByIdClassPeriod = async (
  emploiPeriodique_id,
  id_teacher,
  dbName
) => {
  const teacherPeriodModel = await getTeacherPeriodModel(dbName);
  const query = {
    id_classe_period: emploiPeriodique_id,
    id_teacher: id_teacher,
  };
  return await teacherPeriodModel
    .find(query)
    .populate("id_classe_period")
    .populate("id_teacher");
};

const updateTeacherPeriod = async (id, nbr_heure, dbName) => {
  const teacherPeriodModel = await getTeacherPeriodModel(dbName);
  return await teacherPeriodModel.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        nbr_heure: nbr_heure,
      },
    },
    { new: true }
  );
};

const fetchPeriodsBySemesterAndTeacherId = async (
  semester,
  teacherId,
  dbName
) => {
  try {
    const teacherPeriodModel = await getTeacherPeriodModel(dbName);
    return await teacherPeriodModel
      .find({
        semestre: semester,
        id_teacher: teacherId,
      })
      .populate("id_teacher")
      .populate("id_classe_period");
  } catch (error) {
    throw new Error("Error fetching periods: " + error.message);
  }
};

const deleteManyPeriods = async (dbName, ids) => {
  const teacherPeriodModel = await getTeacherPeriodModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await teacherPeriodModel.deleteMany(query);
};

module.exports = {
  createTeacherPeriod,
  getTeacherPeriod,
  updateTeacherPeriod,
  getTeacherPeriodByIdClassPeriod,
  fetchPeriodsBySemesterAndTeacherId,
  getAllTeacherPeriods,
  deleteManyPeriods,
};
