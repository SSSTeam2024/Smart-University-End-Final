const mongoose = require("mongoose");

const personnelWorkingDaySchema = new mongoose.Schema({
  day_start_time: String,
  day_end_time: String,
  daily_pause_start: String,
  daily_pause_end: String,
});

module.exports = mongoose.model(
  "PersonnelWorkingDay",
  personnelWorkingDaySchema
);
