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
			path: 'courses',
			populate: {
				path: 'content',
				populate: {
					path: 'options'
				}
			}
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
			newCourses = catalog.courses.reduce((prev, requirement) => {
				prev[requirement.content.id] = requirement.content;
				return prev;
			}, newCourses);
		})
		var newSelections = plan.selections.reduce((prev, obj) => {
			prev[obj["_id"]] = obj;
			return prev;
		}, {});
		
		const result = plan.toObject();
		result.courses = newCourses;
		result.selections = newSelections;
		// result['courses'] = newCourses;
		// console.log(result)
        res.json(result);
    })
    // res.send('NOT IMPLEMENTED: Plan detail: ' + req.params.id)
}

// Handle plan create on POST
function plan_create_post(req, res, next) {
	res.send('NOT IMPLEMENTED: Plan create POST')
}

// Handle plan delete on POST
function plan_delete_post(req, res, next) {
	res.send('NOT IMPLEMENTED: Plan delete POST')
}


// Handle plan update on POST
function plan_update_post(req, res, next) {

	Plan.findById(req.params.id)
	.exec((err, plan) => {
		if (err)
			return next(err);
		if (plan === null) {
			const error = new Error('Plan not found');
			error.status = 404;
			return next(error);
		}
		plan.title = req.body.title;
		plan.description = req.body.description;
		plan.courseList = req.body.courseList;
		plan.coursePlan = req.body.coursePlan;
		if (plan.selections)
			plan.selections.forEach(obj => {
				obj.index = req.body.selections[obj["_id"]].index
			})
		

		plan.save()
		.then(plan => {
			res.json('Plan updated!');
		})
		.catch(err => {
			console.log(err)
			return next(err);
		})
	})
	// res.send('NOT IMPLEMENTED: Plan update POST')
}


module.exports = {
    plan_all,
	plan_detail,
	plan_create_post,
	plan_delete_post,
	plan_update_post,
	
}