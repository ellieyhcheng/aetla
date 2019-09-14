'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RequirementSchema = new Schema({
    content: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'contentModel'
    },
    contentModel: {
        type: String,
        require: true,
        enum: ['Course', 'Elective']
    }
})

module.exports = mongoose.model('Requirement', RequirementSchema);