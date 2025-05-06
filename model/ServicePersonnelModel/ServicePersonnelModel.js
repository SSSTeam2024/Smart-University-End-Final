const mongoose = require("mongoose");

const servicePersonnelSchema = new mongoose.Schema(
  {
    service_ar: String,
    service_fr: String,
  },
  { timestamps: true }
);

// module.exports = mongoose.model('ServicePersonnel', servicePersonnelSchema);
module.exports = servicePersonnelSchema;
