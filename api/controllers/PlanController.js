'use strict';
const mongoose = require('mongoose');

var Plan = require('../models/Plan');
var User = require('../models/User');
var Catalog = require('../models/Catalog');
const {body, validationResult } = require('express-validator');
const {sanitizeBody} = require('express-validator');
var async = require('async');

var utils = require('../utils');

// Display all plans
function plan_all(req, res, next) {
	Plan.find()
		.exec((err, plans) => {
			if (err)
				return next(err);
			res.send(plans);
		})
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

			var newCourses = plan.courses.reduce((prev, catalog) => {
				var newReduce = catalog.courses.reduce((newPrev, requirement) => {
					newPrev[requirement.content.id] = requirement.content;
					return newPrev;
				}, prev);
				
				return newReduce;
			}, {})
			var newSelections = plan.selections.reduce((prev, obj) => {
				prev[obj["_id"]] = obj;
				return prev;
			}, {});

			const result = plan.toObject();
			result.courses = newCourses;
			result.selections = newSelections;
			res.json(result);
		})
}

// Handle plan create on POST
function plan_create(req, res, next) {

	body('title', 'title must not be empty.').isLength({ min: 1, max: 100 }).trim();
	body('description', 'description must not be too long.').isLength({ max: 500 }).trim();
	body('uid', 'uid must not be empty.').isLength({ min: 1}).trim();
	
	sanitizeBody('*').escape();

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = new Error('Error creating plan because bad inputs');
		error.status = 404;
		return next(error);
	}

	User.findOne({ uid: req.body.uid })
		.exec((err, user) => {
			if (err)
				next(err);
			if (user === null) {
				const error = new Error('User not found');
				error.status = 404;
				next(error);
			}

			async.waterfall([
				function(cb) {
					Catalog.findOne({name: utils.majorToSchool[req.body.major]})
					.populate({
						path: 'courses',
					})
					.exec((err, ge) => {
						if (err)
							cb(err, null);
						if (ge === null) {
							const error = new Error('GE catalog not found');
							error.status = 404;
							cb(error, null);
						}
	
						const catalogs = [ge];

						const selections = ge.courses.reduce((prev, requirement) => {
							if (requirement.contentModel === 'Elective') {
								prev.push({
									_id: requirement.content,
									index: 0,
								})
							}
							return prev;
						}, [])
	
						const courseList = ge.courses.reduce((prev, requirement) => {
							prev.push(requirement.content)
							return prev;
						}, [])

						cb(null, selections, courseList, catalogs);
					})
				},
				function(selections, courseList, catalogs, cb) {
					Catalog.findOne({ name: req.body.major.toUpperCase() })
					.populate({
						path: 'courses',
					})
					.exec((err, catalog) => {
						if (err)
							cb(err, null);
						if (catalog === null) {
							const error = new Error('Major catalog not found');
							error.status = 404;
							cb(error, null);
						}
	
						catalogs.push(catalog);

						const newSelections = catalog.courses.reduce((prev, requirement) => {
							if (requirement.contentModel === 'Elective') {
								prev.push({
									_id: requirement.content,
									index: 0,
								})
							}
							return prev;
						}, selections)
	
						const newCourseList = catalog.courses.reduce((prev, requirement) => {
							prev.push(requirement.content)
							return prev;
						}, courseList)
	
						const plan_detail = {
							u: req.body.uid,
							title: req.body.title,
							description: req.body.description,
							courseList: newCourseList,
							coursePlan: [
								{
									name: 'year1',
									quarters: ['fall'],
									fall: [], // CourseIds
									winter: [],
									spring: [],
									summer: [],
								},
							],
							courses: catalogs,
							selections: newSelections,
						}
	
						var plan = new Plan(plan_detail);
						plan.save((err, newPlan) => {
							if (err) {
								cb(err, null);
							}
							const newPlans = user.plans;
							newPlans.push(newPlan.id);
							user.plan = newPlans;
	
							user.save((err, user) => {
								if (err)
									cb(err, null);
	
								cb(null, {
									"_id": newPlan["_id"],
									title: newPlan.title,
									description: newPlan.description,
								});
							})
						})
					})
				}
			], (err, result) => {
				if (err)
					next(err);
				else {
					res.json(result);
				}
			})			
		})
}

// Handle plan delete on DELETE
function plan_delete(req, res, next) {

	Plan.deleteOne({ _id: req.params.id }, (err) => {
		if (err)
			next(err);

		User.findOne({ plans: req.params.id })
			.exec((err, user) => {
				if (err)
					next(err);
				if (!user) {
					const error = new Error('User not found');
					error.status = 404;
					return next(error);
				}

				const newPlans = user.plans.filter(item => item.toString() !== req.params.id);

				user.plans = newPlans;

				user.save((err, newUser) => {
					if (err)
						next(err);

					res.send("Plan deleted")
				})

			})
	})
}

// Handle plan update on PUT
function plan_update(req, res, next) {

	body('title', 'title must not be empty.').isLength({ min: 1, max: 100 }).trim();
	body('description', 'description must not be too long.').isLength({ max: 500 }).trim();
	
	sanitizeBody('*').escape();

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = new Error('Error creating plan because bad inputs');
		error.status = 404;
		return next(error);
	}

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
					return next(err);
				})
		})
}

function plan_copy(req, res, next) {
	const planId = req.params.id;

	User.findOne({ uid: req.body.uid })
		.exec((err, user) => {
			if (err)
				next(err)
			if (!user) {
				const error = new Error('User not found');
				error.status = 404;
				return next(error);
			}
			Plan.findById(planId)
				.exec((err, plan) => {
					if (err)
						next(err);
					if (!plan) {
						const error = new Error('Plan not found');
						error.status = 404;
						return next(error);
					}

					var copy = plan;
					copy.title = req.body.title;
					copy.description = req.body.description;
					copy._id = mongoose.Types.ObjectId();
					copy.isNew = true;
					copy.save((err, newPlan) => {
						if (err)
							next(err);
						
						const newPlans = user.plans;
						newPlans.push(newPlan.id);
						user.plan = newPlans;

						user.save((err, user) => {
							if (err)
								return next(err);

							res.json({
								"_id": newPlan["_id"],
								title: newPlan.title,
								description: newPlan.description,
							});
						})
					})

				})
		})

}

module.exports = {
	plan_all,
	plan_detail,
	plan_create,
	plan_delete,
	plan_update,
	plan_copy,
}