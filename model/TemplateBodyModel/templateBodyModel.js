const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateBodySchema = new Schema({
  title: String,
  doc: String,
  langue: String,
  intended_for: String,
  has_code: String,
  has_number: String
});


module.exports = mongoose.model('TemplateBody', templateBodySchema);
