'use strict';

var Plan = require('../models/Plan');

// Display all plans
function plan_all(req, res, next) {
	Plan.find()
    .exec((err, plans) => {
        if (err)
            return next(err);
        res.send(plans);
    })
    // res.send('NOT IMPLEMENTED: Plan All')
}

// Display details of a plan
function plan_detail(req, res, next) {
	Plan.findById(req.params.id)
	.populate({
		path: 'courses',
		populate: {
			path: 'courses'
		}
	})
    .exec((err, plan) => {
        if (err)
			return next(err);
		if (plan === null) {
			const error = new Error('Plan not found');
			error.status = 404;
			return next(error);
		}
		var newCourses = {};
		plan.courses.forEach(catalog => {
			// console.log(catalog)
			newCourses = catalog.courses.reduce((prev, course) => {
				prev[course.id] = course;
				return prev;
			}, newCourses);
		})
		const result = plan.toObject();
		result.courses = newCourses;
		// result['courses'] = newCourses;
		// console.log(result)
        res.json(result);
    })
    // res.send('NOT IMPLEMENTED: Plan detail: ' + req.params.id)
}

// Display plan create form on GET
function plan_create_get(req, res, next) {
	res.send('NOT IMPLEMENTED: Plan create GET')
}

// Handle plan create on POST
function plan_create_post(req, res, next) {
	res.send('NOT IMPLEMENTED: Plan create POST')
}

// Display plan delete form on GET
function plan_delete_get(req, res) {
	res.send('NOT IMPLEMENTED: Plan delete GET')
}

// Handle plan delete on POST
function plan_delete_post(req, res, next) {
	res.send('NOT IMPLEMENTED: Plan delete POST')
}

// Display plan update form on GET
function plan_update_get(req, res, next) {
	// res.send('NOT IMPLEMENTED: Plan update GET')
}

// Handle plan update on POST
function plan_update_post(req, res, next) {
	var plan = new Plan(
		{
			title: req.body.title,
			description: req.body.description,
			courseLists: req.body.courseLists,
			coursePlan: req.body.coursePlan,
			_id: req.params.id,
		}
	)

	Plan.findByIdAndUpdate(req.params.id, plan, {}, (err, thePlan) => {
		if (err)
			return next(err);
		res.send('Plan ' + thePlan.id + ' update succeeded!');
	})

	// Plan.findById(req.params.id)
	// .exec((err, plan) => {
	// 	if (err)
	// 		return next(err);
	// 	if (plan === null) {
	// 		const error = new Error('Plan not found');
	// 		error.status = 404;
	// 		return next(error);
	// 	}
	// 	plan.title = req.body.title;
	// 	plan.description = req.body.description;
	// 	plan.courseLists = req.body.courseLists;
	// 	plan.coursePlan = req.body.coursePlan;

	// 	plan.save()
	// 	.then(plan => {
	// 		res.json('Plan updated!');
	// 	})
	// 	.catch(err => {
	// 		return next(err);
	// 	})
	// })
	// res.send('NOT IMPLEMENTED: Plan update POST')
}


module.exports = {
    plan_all,
	plan_detail,
	plan_create_get,
	plan_create_post,
	plan_delete_get,
	plan_delete_post,
	plan_update_get,
	plan_update_post,
	
}