const classEmploiPeriodiqueSchema = require("../../model/ClassEmploiPeriodiqueModel/ClassEmploiPeriodiqueModel");

function getClassEmploiPeriodiqueModel(dbConnection) {
  return (
    dbConnection.models.ClassEmploiPeriodique ||
    dbConnection.model("ClassEmploiPeriodique", classEmploiPeriodiqueSchema)
  );
}

const createClassEmploiPeriodique = async (params, dbName) => {
  const classEmploiPeriodiqueModel = await getClassEmploiPeriodiqueModel(
    dbName
  );
  return await classEmploiPeriodiqueModel.create(params);
};

const getClassEmploiPeriodique = async (id, dbName) => {
  const classEmploiPeriodiqueModel = await getClassEmploiPeriodiqueModel(
    dbName
  );
  const query = {
    id_classe: id,
  };
  return await classEmploiPeriodiqueModel.find(query).populate("id_classe");
};

const getClassEmploiPeriodiqueByState = async (id, semestre, dbName) => {
  const classEmploiPeriodiqueModel = await getClassEmploiPeriodiqueModel(
    dbName
  );
  const query = {
    etat: "En élaboration",
    id_classe: id,
    semestre: semestre,
  };
  return await classEmploiPeriodiqueModel.find(query).populate("id_classe");
};

const getAllClassEmploiPeriodiqueBySemestre = async (semestre, dbName) => {
  const classEmploiPeriodiqueModel = await getClassEmploiPeriodiqueModel(
    dbName
  );
  const query = {
    semestre: semestre,
  };
  return await classEmploiPeriodiqueModel.find(query).populate("id_classe");
};

const getEmploiPeriodiqueByClass = async (classId, semestre, dbName) => {
  const classEmploiPeriodiqueModel = await getClassEmploiPeriodiqueModel(
    dbName
  );
  const query = {
    semestre: semestre,
    id_classe: classId,
    etat: "En élaboration",
  };
  return await classEmploiPeriodiqueModel.find(query).populate("id_classe");
};

const updateClassEmploiPeriodique = async (id, updateData, dbName) => {
  const classEmploiPeriodiqueModel = await getClassEmploiPeriodiqueModel(
    dbName
  );
  return await classEmploiPeriodiqueModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

module.exports = {
  createClassEmploiPeriodique,
  getClassEmploiPeriodique,
  updateClassEmploiPeriodique,
  getAllClassEmploiPeriodiqueBySemestre,
  getEmploiPeriodiqueByClass,
  getClassEmploiPeriodiqueByState,
};
