const mongoose = require('mongoose');

const gradeEnseignantSchema = new mongoose.Schema({
value_grade_enseignant: { type: String, unique: true},
  grade_ar: String,
  grade_fr: String,
 
},
{ timestamps: true });

module.exports = mongoose.model('GradeEnseignant', gradeEnseignantSchema);