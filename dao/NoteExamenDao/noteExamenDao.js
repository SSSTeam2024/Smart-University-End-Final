const NoteExamenSchema = require("../../model/NoteExamenModel/noteExamenModel");

function getNoteExamenModel(dbConnection) {
  return (
    dbConnection.models.NoteExamen ||
    dbConnection.model("NoteExamen", NoteExamenSchema)
  );
}

const createNote = async (Note, dbName) => {
  const NoteExamen = await getNoteExamenModel(dbName);
  return await NoteExamen.create(Note);
};

const getNotes = async (dbName) => {
  const NoteExamen = await getNoteExamenModel(dbName);
  return await NoteExamen.find()
    .populate("enseignant")
    .populate("groupe")
    .populate("matiere")
    .populate({
      path: "etudiants.etudiant",
      model: "Etudiant",
    });
};

const updateNote = async (id, updateData, dbName) => {
  const NoteExamen = await getNoteExamenModel(dbName);
  return await NoteExamen.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteNote = async (id, dbName) => {
  const NoteExamen = await getNoteExamenModel(dbName);
  return await NoteExamen.findByIdAndDelete(id);
};

const getNoteById = async (id, dbName) => {
  const NoteExamen = await getNoteExamenModel(dbName);
  return await NoteExamen.findById(id);
};

const deleteManyNotes = async (dbName, ids) => {
  const noteExamenModel = await getNoteExamenModel(dbName);
  const query = {
    _id: { $in: ids },
  };
  return await noteExamenModel.deleteMany(query);
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
  deleteManyNotes,
};
