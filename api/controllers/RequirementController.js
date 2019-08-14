'use strict';

var Requirement = require('../models/Requirement');
// var Course = require('../models/Course');

// Display all requirements
function requirement_all(req, res, next) {
    Requirement.find()
    .populate('content')
    .exec((err, requirements) => {
        if (err)
            return next(err);
        res.send(requirements);
    })
    // res.send('NOT IMPLEMENTED: CourseList All')
}

// Display details of a requirement
function requirement_detail(req, res, next) {
    Requirement.findById(req.params.id)
    .populate('content')
    .exec((err, requirement) => {
        if (err)
            return next(err);
        if (requirement === null) {
            const error = new Error('Requirment not found');
            error.status = 404;
            return next(error);
        }
        res.json(requirement);
    })
    // res.send('NOT IMPLEMENTED: CourseList detail: ' + req.params.id)
}

module.exports = {
    requirement_all,
    requirement_detail,
}