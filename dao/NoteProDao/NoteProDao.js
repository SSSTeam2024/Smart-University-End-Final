const NoteProSchema = require("../../model/NoteProModel/NotePro");

function getNoteProModel(dbConnection) {
  return (
    dbConnection.models.NotePro || dbConnection.model("NotePro", NoteProSchema)
  );
}

const createNotePro = async (noteProData, dbName) => {
  const NotePro = await getNoteProModel(dbName);
  const notePro = new NotePro(noteProData);
  return notePro.save();
};

const getAllNotesPro = async (dbName) => {
  const NotePro = await getNoteProModel(dbName);
  return NotePro.find().populate("personnel");
};

const getNoteProById = async (id, dbName) => {
  const NotePro = await getNoteProModel(dbName);
  return NotePro.findById(id);
};

const getNoteProByYear = async (annee, dbName) => {
  const NotePro = await getNoteProModel(dbName);
  const query = {
    annee: annee,
  };
  return await NotePro.find(query);
};

const updateNotePro = async (id, updateData, dbName) => {
  const NotePro = await getNoteProModel(dbName);
  return NotePro.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteManyNotePro = async (dbName, ids) => {
  const noteProModel = await getNoteProModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await noteProModel.deleteMany(query);
};

const getNoteProByPersonnelId = async (id, dbName) => {
  try {
    const noteProModel = await getNoteProModel(dbName);
    const notesPro = await noteProModel.find({
      personnel: id,
    });
    return notesPro;
  } catch (error) {
    console.error("Error while getting notesPro by personnel id in Dao ");
    throw error;
  }
};

module.exports = {
  createNotePro,
  getAllNotesPro,
  getNoteProById,
  updateNotePro,
  getNoteProByYear,
  deleteManyNotePro,
  getNoteProByPersonnelId,
};
