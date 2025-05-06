const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteProSchema = new Schema(
  {
    personnel: { type: Schema.Types.ObjectId, ref: "Personnel" },
    note1: { type: String, required: true },
    note2: { type: String, required: true },
    note3: { type: String, required: true },
    note4: { type: String, required: true },
    note5: { type: String, required: true },
    note_finale: { type: String, required: true },
    annee: { type: String, required: true },
    observation: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = NoteProSchema;
