const seanceDao = require("../../dao/SeanceDao/SeanceDao");
const teacherPeriodService = require("../../services/TeacherPeriodServices/TeacherPeriodServices");

const { getDb } = require("../../config/dbSwitcher");

const createSeance = async (data, useNew) => {
  const db = await getDb(useNew);
  const hoursNumber = getHoursNumber(
    data.heure_debut,
    data.heure_fin,
    data.type_seance
  );
  let result = await teacherPeriodService.getTeacherPeriodByIdClassPeriod(
    data.emploiPeriodique_id,
    data.enseignant,
    db
  );

  if (result.length > 0) {
    let newHoursNumber = hoursNumber + Number(result[0].nbr_heure);
    await teacherPeriodService.updateTeacherPeriod(
      result[0]._id,
      String(newHoursNumber),
      db
    );
  } else {
    const req_data = {
      id_teacher: data.enseignant,
      id_classe_period: data.emploiPeriodique_id,
      nbr_heure: String(hoursNumber),
      semestre: data.semestre,
    };
    await teacherPeriodService.createTeacherPeriod(req_data, db);
  }

  let session = await seanceDao.createSeance(data, db);
  return session;
};

const updateSeance = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await seanceDao.updateSeance(id, updateData, db);
};

const getSeanceById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await seanceDao.getSeanceById(id, db);
};

const getSeancesByIdTeacher = async (
  teacherId,
  jour,
  emplois_periodiques_ids,
  useNew
) => {
  const db = await getDb(useNew);
  let seances = [];
  for (const id of emplois_periodiques_ids) {
    const result = await seanceDao.getSeancesByIdTeacher(
      teacherId,
      jour,
      id,
      db
    );
    seances.push(result);
  }
  return seances;
};

const getPeriodicSessionsByTeacher = async (
  teacherId,
  emplois_periodiques_ids,
  useNew
) => {
  const db = await getDb(useNew);
  let seances = [];
  for (const id of emplois_periodiques_ids) {
    const result = await seanceDao.getPeriodicSessionsByTeacher(
      teacherId,
      id,
      db
    );
    seances = seances.concat(result);
  }
  return seances;
};

const getSeancesByTeacher = async (teacherId, semestre, useNew) => {
  const db = await getDb(useNew);
  let seances = await seanceDao.getSeancesByTeacher(teacherId, semestre, db);
  return seances;
};

const getSessionsByRoomId = async (roomId, useNew) => {
  const db = await getDb(useNew);
  return await seanceDao.getSessionsByRoomId(roomId, db);
};

const getAllSeances = async (useNew) => {
  const db = await getDb(useNew);
  const result = await seanceDao.getSeances(db);
  return result;
};

const getAllSeancesByIdEmploi = async (idEmploi, useNew) => {
  const db = await getDb(useNew);
  const result = await seanceDao.getSeancesByIdEmploiPeriodique(idEmploi, db);
  return result;
};

const deleteSeance = async (seance, useNew) => {
  try {
    const db = await getDb(useNew);
    const hoursNumber = getHoursNumber(seance.heure_debut, seance.heure_fin);
    let result = await teacherPeriodService.getTeacherPeriodByIdClassPeriod(
      seance.emploiPeriodique_id._id,
      seance.enseignant._id,
      db
    );
    let newHoursNumber = Number(result[0].nbr_heure) - hoursNumber;
    const deletedSeance = await seanceDao.deleteSeance(seance._id);
    await teacherPeriodService.updateTeacherPeriod(
      result[0]._id,
      String(newHoursNumber),
      db
    );
    if (!deletedSeance) {
      throw new Error("Seance not found");
    }
    return deletedSeance;
  } catch (error) {
    console.error("Error deleting seance:", error);
    throw error;
  }
};

const getHoursNumber = (start, end, sessionType) => {
  // Parse hours and minutes from the start and end times
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  // Convert to total minutes
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  // Calculate the difference in minutes
  const durationMinutes = endTotalMinutes - startTotalMinutes;

  let result =
    sessionType === "1" ? durationMinutes / 60 : durationMinutes / 60 / 2;

  // Convert minutes to decimal hours
  return result;
};

const getSeancesByIdTeacherAndSemestre = async (
  enseignantId,
  semestre,
  useNew
) => {
  const db = await getDb(useNew);
  return await seanceDao.fetchSeancesByIdTeacherAndSemestre(
    enseignantId,
    semestre,
    db
  );
};

module.exports = {
  deleteSeance,
  getAllSeances,
  getSeanceById,
  updateSeance,
  createSeance,
  getAllSeancesByIdEmploi,
  getSeancesByIdTeacher,
  getSessionsByRoomId,
  getSeancesByTeacher,
  getSeancesByIdTeacherAndSemestre,
  getPeriodicSessionsByTeacher,
};
