'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CourseSchema = new Schema({
    subject: {type: String, required: true, uppercase: true},
    num: {type: String, required: true},
    title: {type: String, required: true},
    units: Number,
    description: String,
})

CourseSchema.virtual('courseRef').get(() => {
    return this.subject + ' ' + this.num;
})

CourseSchema.virtual('url').get(() => {
    return '/api/courses/' + this._id;
})

module.exports = mongoose.model('Course', CourseSchema);