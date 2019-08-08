'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CatalogSchema = new Schema({
    name: String,
    courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]
})


CatalogSchema.virtual('url').get(() => {
    return '/api/catalog/' + this._id;
})

module.exports = mongoose.model('Catalog', CatalogSchema);