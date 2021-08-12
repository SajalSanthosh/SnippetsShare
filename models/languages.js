const mongoose = require('mongoose');

const languagesSchemaDefinition = {
    name: {
        type: String,
        required: true
    }
};

var languagesSchema = new mongoose.Schema(languagesSchemaDefinition);
module.exports = mongoose.model('language', languagesSchema);