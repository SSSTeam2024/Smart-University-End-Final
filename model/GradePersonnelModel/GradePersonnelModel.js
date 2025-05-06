const mongoose = require("mongoose");

const gradePersonnelSchema = new mongoose.Schema(
  {
    grade_ar: String,
    grade_fr: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model('GradePersonnel', gradePersonnelSchema);
module.exports = gradePersonnelSchema;
