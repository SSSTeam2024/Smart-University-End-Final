const classEmploiPeriodiqueDao = require("../../dao/ClassEmploiPeriodiqueDao/ClassEmploiPeriodiqueDao");
const sessionService = require("../../services/SeanceServices/SeanceServices");
const sessionDao = require("../../dao/SeanceDao/SeanceDao");
const teacherPeriodService = require("../../services/TeacherPeriodServices/TeacherPeriodServices");
const { getDb } = require("../../config/dbSwitcher");

const createClassEmploiPeriodique = async (params, useNew) => {
  try {
    const db = await getDb(useNew);
    const lastActiveSchedule =
      await classEmploiPeriodiqueDao.getClassEmploiPeriodiqueByState(
        params.id_classe,
        params.semestre,
        db
      );
    let creationResult =
      await classEmploiPeriodiqueDao.createClassEmploiPeriodique(params, db);
    if (lastActiveSchedule.length > 0) {
      let lastActiveScheduleSessions =
        await sessionService.getAllSeancesByIdEmploi(
          lastActiveSchedule[0]._id,
          db
        );
      await cloneSessions(lastActiveScheduleSessions, creationResult._id, db);
    }

    return creationResult;
  } catch (error) {
    console.error("Error when creating time table params", error);
    throw error;
  }
};

const cloneSessions = async (sessions, periodicScheduleId, useNew) => {
  const db = await getDb(useNew);
  if (sessions.length > 0) {
    for (const element of sessions) {
      let session = {
        matiere: element.matiere,
        enseignant: element.enseignant,
        classe: element.classe,
        salle: element.salle,
        jour: element.jour,
        heure_debut: element.heure_debut,
        heure_fin: element.heure_fin,
        type_seance: element.type_seance,
        semestre: element.semestre,
        emploiPeriodique_id: periodicScheduleId,
      };

      const hoursNumber = getHoursNumber(
        session.heure_debut,
        session.heure_fin
      );

      let result = await teacherPeriodService.getTeacherPeriodByIdClassPeriod(
        periodicScheduleId,
        session.enseignant._id,
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
          id_teacher: session.enseignant._id,
          id_classe_period: periodicScheduleId,
          nbr_heure: String(hoursNumber),
          semestre: session.semestre,
        };
        await teacherPeriodService.createTeacherPeriod(req_data, db);
      }
      await sessionDao.createSeance(session);
    }
  }
};

const getHoursNumber = (start, end) => {
  // Parse hours and minutes from the start and end times
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  // Convert to total minutes
  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  // Calculate the difference in minutes
  const durationMinutes = endTotalMinutes - startTotalMinutes;

  // Convert minutes to decimal hours
  return durationMinutes / 60;
};

const updateClassEmploiPeriodique = async (id, updateData, useNew) => {
  return await classEmploiPeriodiqueDao.updateClassEmploiPeriodique(
    id,
    updateData,
    db
  );
};

const getClassEmploiPeriodique = async (id, useNew) => {
  const db = await getDb(useNew);
  const result = await classEmploiPeriodiqueDao.getClassEmploiPeriodique(
    id,
    db
  );
  return result;
};

const getEmploiPeriodiqueByClasse = async (classId, semestre, useNew) => {
  const db = await getDb(useNew);
  const result = await classEmploiPeriodiqueDao.getEmploiPeriodiqueByClass(
    classId,
    semestre,
    db
  );
  return result;
};

module.exports = {
  createClassEmploiPeriodique,
  updateClassEmploiPeriodique,
  getClassEmploiPeriodique,
  getEmploiPeriodiqueByClasse,
};
