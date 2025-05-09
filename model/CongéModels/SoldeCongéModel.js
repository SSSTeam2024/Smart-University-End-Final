const mongoose = require("mongoose");

const LeaveBalanceSchema = new mongoose.Schema({
  personnelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Personnel",
    required: true,
  },
  leaveType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LeaveType",
    required: true,
  },
  subcategory: {
    _id: String,
    name_fr: String,
    name_ar: String,
    maxDays: Number,
    sexe: { type: String, enum: ["Homme", "Femme", "Both"], default: "Both" },
    Accumulable: { type: Boolean, default: false },
  },
  remainingDays: { type: Number, required: false },
  daysUsed: { type: Number, default: 0, required: false },
  year: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

LeaveBalanceSchema.index(
  { personnelId: 1, leaveType: 1, subcategory: 1, year: 1 },
  { unique: true }
);

// module.exports = mongoose.model('LeaveBalance', LeaveBalanceSchema);
module.exports = LeaveBalanceSchema;
