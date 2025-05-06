const salleDao = require("../../dao/SalleDao/SalleDao");
const departementSchema = require("../../model/departementModel/DepartementModel");
const seanceDao = require("../../dao/SeanceDao/SeanceDao");
const classEmploiPeriodiqueDao = require("../../dao/ClassEmploiPeriodiqueDao/ClassEmploiPeriodiqueDao");
const rattrapageService = require("../RattrapageServices/RattrapageServices");

const { getDb } = require("../../config/dbSwitcher");

function getDepartementModel(dbConnection) {
  return (
    dbConnection.models.Departement ||
    dbConnection.model("Departement", departementSchema)
  );
}

const createSalle = async (userData, useNew) => {
  try {
    const db = await getDb(useNew);
    const salle = await salleDao.createSalle(userData, db);
    const DepartementModel = await getDepartementModel(dbName, db);

    await DepartementModel.findByIdAndUpdate(userData.departement, {
      $push: { salles: salle._id },
    });
    return await salle.populate("departement");
  } catch (error) {
    console.error("Error in salle service:", error);
    throw error;
  }
};

const updateSalle = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await salleDao.updateSalle(id, updateData, db);
};

const getSalleById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await salleDao.getSalleById(id, db);
};

const getSallesByDayAndTime = async (
  day,
  start_time,
  end_time,
  session_type,
  date_fin_emploi_period,
  date_debut_emploi_period,
  semestre,
  useNew
) => {
  const db = await getDb(useNew);
  let emploiClassPeriodique =
    await classEmploiPeriodiqueDao.getAllClassEmploiPeriodiqueBySemestre(
      semestre,
      db
    );

  const givenStart = parseDate(date_debut_emploi_period);
  const givenEnd = parseDate(date_fin_emploi_period);

  const intersectingIntervals = emploiClassPeriodique.filter((period) => {
    const intervalStart = parseDate(period.date_debut);
    const intervalEnd = parseDate(period.date_fin);
    return intervalStart <= givenEnd && intervalEnd >= givenStart;
  });

  let sessions = [];

  for (const interval of intersectingIntervals) {
    let day_sessions = await seanceDao.getSeanceByDayAndTime(
      interval._id,
      day,
      db
    );
    sessions = sessions.concat(day_sessions);
  }

  let filteredSessions = sessions.filter(
    (s) =>
      (s.heure_debut < start_time &&
        s.heure_fin > start_time &&
        s.heure_fin < end_time) ||
      (s.heure_debut === start_time && s.heure_fin === end_time) ||
      (s.heure_debut > start_time &&
        s.heure_debut < end_time &&
        s.heure_fin > end_time) ||
      (s.heure_debut === start_time && s.heure_fin < end_time) ||
      (s.heure_debut > start_time && s.heure_fin === end_time) ||
      (s.heure_debut > start_time && s.heure_fin < end_time) ||
      (s.heure_debut < start_time && s.heure_fin > end_time) ||
      (s.heure_debut === start_time && s.heure_fin > end_time) ||
      (s.heure_debut < start_time && s.heure_fin === end_time)
  );

  let allSalles = await salleDao.getSalles(db);
  let occupiedRooms = [];
  for (const filteredSession of filteredSessions) {
    occupiedRooms.push({
      room: filteredSession.salle,
      session_type: filteredSession.type_seance,
    });
  }

  const availableRooms = [];

  for (const room of allSalles) {
    let found = false;
    for (const occupiedRoom of occupiedRooms) {
      if (room.salle === occupiedRoom.room.salle) {
        found = true;
        break;
      }
    }

    if (!found) {
      availableRooms.push(room);
    }
  }
  if (session_type === "1/15") {
    for (const occupiedRoom of occupiedRooms) {
      if (occupiedRoom.session_type === "1/15") {
        availableRooms.push(occupiedRoom.room);
      }
    }
  }
  const uniqueAvailableRooms = removeDuplicates(availableRooms, "salle");

  return uniqueAvailableRooms;
};

const getSallesDispoRattrapage = async (
  day,
  date_rattrapage,
  start_time,
  end_time,
  date_fin_emploi_period,
  date_debut_emploi_period,
  semestre,
  useNew
) => {
  const db = await getDb(useNew);
  let emploiClassPeriodique =
    await classEmploiPeriodiqueDao.getAllClassEmploiPeriodiqueBySemestre(
      semestre,
      db
    );
  const givenStart = parseDate(date_debut_emploi_period);
  const givenEnd = parseDate(date_fin_emploi_period);

  const intersectingIntervals = emploiClassPeriodique.filter((period) => {
    const intervalStart = parseDate(period.date_debut);
    const intervalEnd = parseDate(period.date_fin);
    return intervalStart <= givenEnd && intervalEnd >= givenStart;
  });

  let normalAndRecoverSessions = [];

  for (const interval of intersectingIntervals) {
    let day_sessions = await seanceDao.getSeanceByDayAndTime(
      interval._id,
      day,
      db
    );
    normalAndRecoverSessions = normalAndRecoverSessions.concat(day_sessions);
  }

  let rattrapages = await rattrapageService.getRattrapages(db);

  let implicatedRecoverSessions = rattrapages.filter((r) => {
    const date1 = parseDateV2(r.date);
    const date2 = parseDateV2(date_rattrapage);
    return date1.getTime() === date2.getTime();
  });

  normalAndRecoverSessions = normalAndRecoverSessions.concat(
    implicatedRecoverSessions
  );

  let filteredNormalAndRecoverSessions = normalAndRecoverSessions.filter(
    (s) =>
      (s.heure_debut < start_time &&
        s.heure_fin > start_time &&
        s.heure_fin < end_time) ||
      (s.heure_debut === start_time && s.heure_fin === end_time) ||
      (s.heure_debut > start_time &&
        s.heure_debut < end_time &&
        s.heure_fin > end_time) ||
      (s.heure_debut === start_time && s.heure_fin < end_time) ||
      (s.heure_debut > start_time && s.heure_fin === end_time) ||
      (s.heure_debut > start_time && s.heure_fin < end_time) ||
      (s.heure_debut < start_time && s.heure_fin > end_time) ||
      (s.heure_debut === start_time && s.heure_fin > end_time) ||
      (s.heure_debut < start_time && s.heure_fin === end_time)
  );

  let allSalles = await salleDao.getSalles(db);
  let occupiedRooms = [];
  for (const filteredSession of filteredNormalAndRecoverSessions) {
    occupiedRooms.push({
      room: filteredSession.salle,
      session_type: filteredSession.type_seance,
    });
  }

  const availableRooms = [];

  for (const room of allSalles) {
    let found = false;
    for (const occupiedRoom of occupiedRooms) {
      if (room.salle === occupiedRoom.room.salle) {
        found = true;
        break;
      }
    }

    if (!found) {
      availableRooms.push(room);
    }
  }

  const uniqueAvailableRooms = removeDuplicates(availableRooms, "salle");

  return uniqueAvailableRooms;
};

const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const parseDateV2 = (dateStr) => {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
};

const removeDuplicates = (array, key) => {
  const seen = new Set();
  return array.filter((item) => {
    const keyValue = item[key];
    if (seen.has(keyValue)) {
      return false;
    } else {
      seen.add(keyValue);
      return true;
    }
  });
};

const getSalles = async (useNew) => {
  const db = await getDb(useNew);
  const result = await salleDao.getSalles(db);
  return result;
};

const deleteSalleById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await salleDao.deleteSalle(id, db);
};

module.exports = {
  deleteSalleById,
  getSalles,
  getSalleById,
  updateSalle,
  createSalle,
  getSallesByDayAndTime,
  getSallesDispoRattrapage,
};
