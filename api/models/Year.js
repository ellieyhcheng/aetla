'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var YearSchema = new Schema({
    name: {type: String, required: true,}, // 'year1'
    quarters: {type: [String], default: ['fall']},
    fall: {type: [Schema.Types.ObjectId], ref: 'Course', default: []},
    winter: {type: [Schema.Types.ObjectId], ref: 'Course', default: []},
    spring: {type: [Schema.Types.ObjectId], ref: 'Course', default: []},
    summer: {type: [Schema.Types.ObjectId], ref: 'Course', default: []},
})

module.exports = mongoose.model('Year', YearSchema);