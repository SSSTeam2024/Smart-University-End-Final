const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AbsencePersonnelSchema = new Schema({
  personnel: { type: Schema.Types.ObjectId, ref: 'Personnel' , default: null},
  jour: {type: String, required: false},
  seance: {type: String, required: false},
  status:{type: String, required: false},
 
}, 
{ timestamps: true });

module.exports = mongoose.model('AbsencePersonnel', AbsencePersonnelSchema);