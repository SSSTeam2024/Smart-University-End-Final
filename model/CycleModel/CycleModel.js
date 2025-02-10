const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema(
  {
    cycle_ar: String,
    cycle_fr: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cycle", cycleSchema);
