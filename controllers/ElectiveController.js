'use strict';

var Elective = require('../models/Elective');
// var Course = require('../models/Course');

// Display all electives
function elective_all(req, res, next) {
    Elective.find()
    .populate('options')
    .exec((err, electives) => {
        if (err)
            return next(err);
        res.send(electives);
    })
    // res.send('NOT IMPLEMENTED: CourseList All')
}

// Display details of a elective
function elective_detail(req, res, next) {
    Elective.findById(req.params.id)
    .populate('options')    
    .exec((err, elective) => {
        if (err)
            return next(err);
        if (elective === null) {
            const error = new Error('Elective not found');
            error.status = 404;
            return next(error);
        }
        res.json(elective);
    })
    // res.send('NOT IMPLEMENTED: CourseList detail: ' + req.params.id)
}

module.exports = {
    elective_all,
    elective_detail,
}