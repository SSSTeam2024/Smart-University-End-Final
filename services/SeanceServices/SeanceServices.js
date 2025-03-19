const seanceDao = require("../../dao/SeanceDao/SeanceDao");
const SalleDisponibiliteService = require("../../services/SalleDisponibiliteServices/SalleDisponibiliteServices");
const teacherPeriodService = require("../../services/TeacherPeriodServices/TeacherPeriodServices");

const createSeance = async (data) => {

  const hoursNumber = getHoursNumber(data.heure_debut, data.heure_fin, data.type_seance);


  let result = await teacherPeriodService.getTeacherPeriodByIdClassPeriod(
    data.emploiPeriodique_id,
    data.enseignant
  );

  if (result.length > 0) {
    let newHoursNumber = hoursNumber + Number(result[0].nbr_heure);
    await teacherPeriodService.updateTeacherPeriod(
      result[0]._id,
      String(newHoursNumber)
    );
  } else {
    const req_data = {
      id_teacher: data.enseignant,
      id_classe_period: data.emploiPeriodique_id,
      nbr_heure: String(hoursNumber),
      semestre: data.semestre,
    };
    await teacherPeriodService.createTeacherPeriod(req_data);
  }

  let session = await seanceDao.createSeance(data);
  return session;
};

const updateSeance = async (id, updateData) => {
  return await seanceDao.updateSeance(id, updateData);
};

const getSeanceById = async (id) => {
  return await seanceDao.getSeanceById(id);
};

const getSeancesByIdTeacher = async (
  teacherId,
  jour,
  emplois_periodiques_ids
) => {
  let seances = [];
  for (const id of emplois_periodiques_ids) {
    const result = await seanceDao.getSeancesByIdTeacher(teacherId, jour, id);
    seances.push(result);
  }
  return seances;
};

const getPeriodicSessionsByTeacher = async (
  teacherId,
  emplois_periodiques_ids
) => {
  let seances = [];
  for (const id of emplois_periodiques_ids) {
    const result = await seanceDao.getPeriodicSessionsByTeacher(teacherId, id);
    seances = seances.concat(result);
  }
  return seances;
};

// Séances des emplois periodiques (En Elaboration)
const getSeancesByTeacher = async (teacherId, semestre) => {
  let seances = await seanceDao.getSeancesByTeacher(teacherId, semestre);
  return seances;
};

const getSessionsByRoomId = async (roomId) => {
  return await seanceDao.getSessionsByRoomId(roomId);
};

const getAllSeances = async () => {
  const result = await seanceDao.getSeances();
  return result;
};

const getAllSeancesByIdEmploi = async (idEmploi) => {
  const result = await seanceDao.getSeancesByIdEmploiPeriodique(idEmploi);
  return result;
};

const deleteSeance = async (seance) => {
  try {
    const hoursNumber = getHoursNumber(seance.heure_debut, seance.heure_fin);
   

    let result = await teacherPeriodService.getTeacherPeriodByIdClassPeriod(
      seance.emploiPeriodique_id._id,
      seance.enseignant._id
    );


    let newHoursNumber = Number(result[0].nbr_heure) - hoursNumber;

    const deletedSeance = await seanceDao.deleteSeance(seance._id);

    await teacherPeriodService.updateTeacherPeriod(
      result[0]._id,
      String(newHoursNumber)
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

  let result = sessionType === '1' ? durationMinutes / 60 : (durationMinutes / 60) / 2;

  // Convert minutes to decimal hours
  return result;
};

const getSeancesByIdTeacherAndSemestre = async (enseignantId, semestre) => {
  return await seanceDao.fetchSeancesByIdTeacherAndSemestre(
    enseignantId,
    semestre
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