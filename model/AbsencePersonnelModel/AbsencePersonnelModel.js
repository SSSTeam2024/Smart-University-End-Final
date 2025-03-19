const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AbsencePersonnelSchema = new Schema(
  {
    personnels: [
      {
        personnel: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Personnel",
          required: false,
          default: null,
        },
        evening: String,
        morning: String,
        duree: String,
      },
    ],
    jour: { type: String, required: false },
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AbsencePersonnel", AbsencePersonnelSchema);
