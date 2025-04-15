const mongoose = require("mongoose");

const personnelWorkingDaySchema = new mongoose.Schema({
  name: String,
  day_start_time: String,
  day_end_time: String,
  daily_pause_start: String,
  daily_pause_end: String,
  period_start: String,
  period_end: String,
  part_time: String,
});

module.exports = mongoose.model(
  "PersonnelWorkingDay",
  personnelWorkingDaySchema
);
