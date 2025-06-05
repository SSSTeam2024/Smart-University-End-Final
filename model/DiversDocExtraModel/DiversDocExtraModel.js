const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diversDocExtraSchema = new Schema({
    model_id: {
        type: Schema.Types.ObjectId,
        ref: "TemplateBody",
        required: true,
    },
    extra_data: [{
        options: [String],
        data_type: String,
        fieldName: String,
        fieldBody: String
    }]
});

module.exports = diversDocExtraSchema;
