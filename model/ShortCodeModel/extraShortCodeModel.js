const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const extraShortCodeSchema = new Schema({
    titre: String,
    body: String,
    langue: String,
    options: [String],
    data_type: {
        type: String,
        enum: ["file", "regular", "date"],
        default: "regular",
    }
});

module.exports = extraShortCodeSchema;
