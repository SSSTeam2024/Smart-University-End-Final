const noteProDao = require("../../dao/NoteProDao/NoteProDao");

const createNotePro = async (noteProData) => {
  try {
    return await noteProDao.createNotePro(noteProData);
  } catch (error) {
    console.error("Error creating NotePro:", error);
    throw error;
  }
};

const getAllNotesPro = async () => {
  return noteProDao.getAllNotesPro();
};

const getNoteProById = async (id) => {
  return noteProDao.getNoteProById(id);
};

const updateNotePro = async (id, updateData, documents) => {
  try {
    return await noteProDao.updateNotePro(id, updateData);
  } catch (error) {
    console.error("Error updating NotePro ", error);
    throw error;
  }
};

const deleteNotePro = async (id) => {
  return noteProDao.deleteNotePro(id);
};

module.exports = {
  createNotePro,
  getAllNotesPro,
  getNoteProById,
  updateNotePro,
  deleteNotePro,
};
