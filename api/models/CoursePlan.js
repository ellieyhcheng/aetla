'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CoursePlanSchema = new Schema({
    years: {type: [Schema.Types.ObjectId], ref: 'Year', required: true},
})


CoursePlanSchema.virtual('url').get(() => {
    return '/course-plan/' + this._id;
})

module.exports = mongoose.model('CoursePlan', CoursePlanSchema);