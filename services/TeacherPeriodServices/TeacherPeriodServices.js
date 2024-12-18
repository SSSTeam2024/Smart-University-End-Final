const teacherPeriodDao = require("../../dao/TeacherPeriodDao/TeacherPeriodDao");

const createTeacherPeriod = async (params) => {
  try {
    return await teacherPeriodDao.createTeacherPeriod(params);
  } catch (error) {
    console.error("Error when creating teacher period", error);
    throw error;
  }
};

const updateTeacherPeriod = async (id, nbr_heure) => {
  return await teacherPeriodDao.updateTeacherPeriod(id, nbr_heure);
};

const getTeacherPeriod = async (ids_array, semestre) => {
  let teachersPeriods = [];
  for (const id of ids_array) {
    const result = await teacherPeriodDao.getTeacherPeriod(id, semestre);
    teachersPeriods.push({ id_teacher: id, periods: result });
  }

  return teachersPeriods;
};

const getTeacherPeriodsByTeacherId = async (id, semestre) => {
  const result = await teacherPeriodDao.getTeacherPeriod(id, semestre);

  return result;
};

const getTeacherPeriodByIdClassPeriod = async (
  emploiPeriodique_id,
  id_teacher
) => {
  return teacherPeriodDao.getTeacherPeriodByIdClassPeriod(
    emploiPeriodique_id,
    id_teacher
  );
};

module.exports = {
  createTeacherPeriod,
  updateTeacherPeriod,
  getTeacherPeriod,
  getTeacherPeriodByIdClassPeriod,
  getTeacherPeriodsByTeacherId,
};