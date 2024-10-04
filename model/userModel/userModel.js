const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  login: String,
  role_id: String,
  departement_id: String,
  password: String,
  api_token: String,
  photo: String,
  app_name: String,
  status: String,
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
  updatedAt: { type: Date, default: Date.now }
});

// Automatically update the `updatedAt` field on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
