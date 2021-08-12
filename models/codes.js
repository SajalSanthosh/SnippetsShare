// Import mongoose
const mongoose = require('mongoose');

const codesSchemaDefinition = {
    name: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    language: {
        type: String,
        required: true
    },
};

var codesSchema = new mongoose.Schema(codesSchemaDefinition);
module.exports = mongoose.model('Code', codesSchema);;
