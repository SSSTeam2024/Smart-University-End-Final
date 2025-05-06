const mongoose = require("mongoose");

const LeaveSubcategorySchema = new mongoose.Schema({
  name_fr: { type: String, required: false },
  name_ar: { type: String, required: false },
  maxDays: { type: Number, required: false },
  sexe: { type: String, enum: ["Homme", "Femme", "Both"], default: "Both" },
  Accumulable: { type: Boolean, default: false },
  GradePersonnel: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GradePersonnel",
      required: false,
    },
  ],
});

const LeaveTypeSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name_fr: { type: String, required: true },
  name_ar: { type: String, required: true },
  description: { type: String },
  maxDays: { type: Number, required: false },
  Accumulable: { type: Boolean, default: false },
  sexe: { type: String, enum: ["Homme", "Femme", "Both"], default: "Both" },
  subcategories: { type: [LeaveSubcategorySchema], require: false },
});

// const LeaveType = mongoose.model('LeaveType', LeaveTypeSchema);
module.exports = LeaveTypeSchema;
