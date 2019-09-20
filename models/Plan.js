'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Plan Schema Definition
var PlanSchema = new Schema({
    u: String,
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, maxlength: 500 },
    courseList:  [{ type: Schema.Types.ObjectId, required: true }], // Array of courses in the courselist panel with elective and courses objects
    coursePlan: [{
        type: Schema.Types.Mixed,
        default: {
            name: 'year1',
            quarters: ['fall'],
            fall: [], // CourseIds
            winter: [],
            spring: [],
            summer: [],
        },
    }],
    courses: [{ type: Schema.Types.ObjectId, ref: 'Requirement', required: true }], // Array of requirements, total of courses in courseList and coursePlan
    selections: [{
        _id: { type: Schema.Types.ObjectId, ref: 'Elective', required: true },
        index: { type: Number, required: true, default: 0 },
    }],
});

// Virtual for plan's URL
PlanSchema.virtual('url').get(() => {
    return '/api/plan/' + this._id;
});

module.exports = mongoose.model('Plan', PlanSchema);
