const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  personnelId: { type: Schema.Types.ObjectId, ref: 'Personnel', required: false },
  enseignantId: { type: Schema.Types.ObjectId, ref: 'Enseignant', required: false },
  nom_fr: String,
  prenom_fr: String,
  email: String,
  login: String,
  service: { type: Schema.Types.ObjectId, ref: 'VirtualService', required: false },
  password: String,
  api_token: String,
  app_name: String,
  status: String,
  role: { type: String, enum: ["Etudiant", "Enseignant", "Personnel"], required: false },
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission'}],
  documentEdition: String
},{ timestamps: true });

// Automatically update the `updatedAt` field on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
