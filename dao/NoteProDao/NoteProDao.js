const NotePro = require('../../model/NoteProModel/NotePro');

const createNotePro = async (noteProData) => {
  const notePro = new NotePro(noteProData);
  return notePro.save();
};

const getAllNotesPro = async () => {
  return NotePro.find().populate('personnel');
};

const getNoteProById = async (id) => {
  return NotePro.findById(id);
};

const updateNotePro = async (id, updateData) => {
  return NotePro.findByIdAndUpdate(id, updateData, { new: true });
};

// const deleteDeplacement = async (id) => {
//   return Deplacement.findByIdAndDelete(id);
// };

module.exports = {
  createNotePro,
  getAllNotesPro,
  getNoteProById,
  updateNotePro,
  // deleteDeplacement
};