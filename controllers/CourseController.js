'use strict';

var Course = require('../models/Course');

// Display details of a course
function course_detail(req, res, next) {
    Course.findById(req.params.id)
    .exec((err, course) => {
        if (err)
            return next(err);
        if (course === null) {
            const error = new Error('Course not found');
            error.status = 404;
            return next(error);
        }
        res.json(course);
    })
}

function course_by_subject(req, res, next) {
    const subject = decodeURIComponent(req.params.subject);
    
    Course.find({subject: subject})
    .exec((err, courses) => {
        if (err)
            return next(err);
        res.json({courses});
    })
}

module.exports = {
    course_detail,
    course_by_subject
}