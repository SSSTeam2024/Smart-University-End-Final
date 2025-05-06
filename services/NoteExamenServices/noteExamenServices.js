const noteExamenDao = require("../../dao/NoteExamenDao/noteExamenDao");
const { getDb } = require("../../config/dbSwitcher");

const createNote = async (noteExamenData, useNew) => {
  try {
    const db = await getDb(useNew);
    const Note = await noteExamenDao.createNote(noteExamenData, db);

    return Note;
  } catch (error) {
    console.error("Error in Note service:", error);
    throw error;
  }
};

const updateNote = async (id, updateData, useNew) => {
  const db = await getDb(useNew);
  return await noteExamenDao.updateNote(id, updateData, db);
};

const getNoteById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await noteExamenDao.getNoteById(id, db);
};

const getNotes = async (useNew) => {
  const db = await getDb(useNew);
  const result = await noteExamenDao.getNotes(db);
  return result;
};

const deleteNoteById = async (id, useNew) => {
  const db = await getDb(useNew);
  return await noteExamenDao.deleteNote(id, db);
};

const deleteManyNotes = async (useNew, ids) => {
  const db = await getDb(useNew);
  return await noteExamenDao.deleteManyNotes(db, ids);
};

module.exports = {
  deleteNoteById,
  getNotes,
  getNoteById,
  updateNote,
  createNote,
  deleteManyNotes,
};
