'use strict';

var Catalog = require('../models/Catalog');
// var Course = require('../models/Course');

// Display all catalogs
function catalog_all(req, res, next) {
    Catalog.find()
    .populate('courses')
    .exec((err, catalogs) => {
        if (err)
            return next(err);
        res.send(catalogs);
    })
    // res.send('NOT IMPLEMENTED: CourseList All')
}

// Display details of a catalog
function catalog_detail(req, res, next) {
    Catalog.findById(req.params.id)
    .populate('courses')
    .exec((err, catalog) => {
        if (err)
            return next(err);
        if (catalog === null) {
            const error = new Error('Course List not found');
            error.status = 404;
            return next(error);
        }
        res.json(catalog);
    })
    // res.send('NOT IMPLEMENTED: CourseList detail: ' + req.params.id)
}

module.exports = {
    catalog_all,
    catalog_detail,
}