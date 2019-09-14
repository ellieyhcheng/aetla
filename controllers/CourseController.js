'use strict';

var Course = require('../models/Course');

// Display all courses (bad idea)
function course_all(req, res, next) {
    Course.find({}, 'subject num')
    .exec((err, courses) => {
        if (err)
            return next(err);
        res.send(courses);
    })
    // res.send('NOT IMPLEMENTED: Course All')
}

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
    // res.send('NOT IMPLEMENTED: Course detail: ' + req.params.id)
}

module.exports = {
    course_all,
    course_detail,
}