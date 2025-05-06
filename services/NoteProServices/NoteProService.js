const noteProDao = require("../../dao/NoteProDao/NoteProDao");
const { getDb } = require("../../config/dbSwitcher");

const createNotePro = async (noteProData, useNew) => {
  try {
    const db = await getDb(useNew);
    let results = [];
    for (const notes of noteProData.notes) {
      let result = await noteProDao.createNotePro(notes, db);
      results.push(result);
    }
    return results;
  } catch (error) {
    console.error("Error creating NotePro:", error);
    throw error;
  }
};

const getAllNotesPro = async (dbName) => {
  const db = await getDb(dbName);
  return noteProDao.getAllNotesPro(db);
};

const getNoteProById = async (id, useNew) => {
  const db = await getDb(useNew);
  return noteProDao.getNoteProById(id, db);
};

const getNoteProByYear = async (annee, useNew) => {
  const db = await getDb(useNew);
  return noteProDao.getNoteProByYear(annee, db);
};

const updateNotePro = async (id, updateData, useNew) => {
  try {
    const db = await getDb(useNew);
    return await noteProDao.updateNotePro(id, updateData, db);
  } catch (error) {
    console.error("Error updating NotePro ", error);
    throw error;
  }
};

const deleteManyNotePro = async (dbName, ids) => {
  const db = await getDb(dbName);
  return noteProDao.deleteManyNotePro(db, ids);
};

module.exports = {
  createNotePro,
  getAllNotesPro,
  getNoteProById,
  updateNotePro,
  deleteManyNotePro,
  getNoteProByYear,
};
