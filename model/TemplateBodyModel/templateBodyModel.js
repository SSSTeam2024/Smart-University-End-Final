const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const templateBodySchema = new Schema({
  title: String,
  doc: String,
  langue: String,
  intended_for: String,
  has_code: String,
  has_number: String,
  handled_by: [{
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming your admin users are in the User model
  }]
});

// module.exports = mongoose.model('TemplateBody', templateBodySchema);
module.exports = templateBodySchema;
