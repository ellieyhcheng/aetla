'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Elective = new Schema({
    options: [{type: Schema.Types.ObjectId, ref: 'Course', required: true }],
    name: {type: String, default: ''}
})

Elective.virtual('url').get(() => {
    return '/api/elective/' + this._id;
})

module.exports = mongoose.model('Elective', Elective);