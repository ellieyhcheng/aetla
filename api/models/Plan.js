'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Plan Schema Definition

// Since it is a schema-less type, you can change the value to anything else you like, but Mongoose loses the ability to auto detect and save those changes. To tell Mongoose that the value of a Mixed type has changed, you need to call doc.markModified(path), passing the path to the Mixed type you just changed.
// person.anything = { x: [3, 4, { y: "changed" }] };
// person.markModified('anything');
// person.save(); // Mongoose will save changes to `anything`.
var PlanSchema = new Schema({
    u: String,
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, maxlength: 500 },
    courseList:  [{ type: Schema.Types.ObjectId, ref: 'Requirement', required: true }], // Array of courses in the courselist panel
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
    courses: [{ type: Schema.Types.ObjectId, ref: 'Catalog', required: true }], // Array of catalogs, total of courses in courseList and coursePlan
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
