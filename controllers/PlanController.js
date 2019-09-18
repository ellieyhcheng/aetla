'use strict';
const mongoose = require('mongoose');

var Plan = require('../models/Plan');
var User = require('../models/User');
var Catalog = require('../models/Catalog');
var Course = require('../models/Course');
var Requirement = require('../models/Requirement');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
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
				path: 'content',
				populate: {
					path: 'options'
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

			var newCourses = plan.courses.reduce((prev, requirement) => {
				prev[requirement.content.id] = requirement.content;
				return prev;
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
	body('uid', 'uid must not be empty.').isLength({ min: 1 }).trim();

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

			const ges = [];
			req.body.major.forEach(major => {
				const school = utils.majorToSchool[major];
				if (ges.indexOf(school) === -1) {
					ges.push(school);
				}
			})
			req.body.major = req.body.major.concat(ges);

			const selections = [];
			const courseList = [];
			const courses = [];

			async.each(req.body.major, function(item, cb) {
				Catalog.findOne({ name: item })
					.populate({
						path: 'courses',
					})
					.exec((err, catalog) => {
						if (err)
							cb(err);
						if (catalog === null) {
							const error = new Error('GE catalog not found');
							error.status = 404;
							cb(error);
						}

						catalog.courses.forEach(requirement => {
							courses.push(requirement);
							if (requirement.contentModel === 'Elective') {
								const selection = {
									_id: requirement.content,
									index: 0,
								}
								if (selections.indexOf(selection) === -1) {
									selections.push(selection)
								}
							}
							
							let found = false;
							for (let i = 0; i < courseList.length; i++) {
								if (courseList[i].equals(requirement.content)) {
									found = true;
									break;
								}
							}

							if (!found)
								courseList.push(requirement.content);
						})

						cb(null);
					})
			}, function (err) {
				if (err)
					next(err);
				else {
					const plan_detail = {
						u: req.body.uid,
						title: req.body.title,
						description: req.body.description,
						courseList: courseList,
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
						courses: courses,
						selections: selections,
					}
		
					var plan = new Plan(plan_detail);
					plan.save((err, newPlan) => {
						if (err) {
							next(err);
						}
						const newPlans = user.plans;
						newPlans.push(newPlan.id);
						user.plan = newPlans;
		
						user.save((err, user) => {
							if (err)
								cb(err, null);
		
							res.json({
								"_id": newPlan["_id"],
								title: newPlan.title,
								description: newPlan.description,
							});
						})
					})
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
					res.json({
						title: plan.title,
						description: plan.description,
						"_id": plan["_id"],
					});
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

function course_add(req, res, next) {
	const planId = req.params.id;
	const courseIds = req.body.courses;

	Plan.findById(planId)
	.exec((err, plan) => {
		if (err)
			return next(err);
		if (plan === null) {
			const error = new Error('Plan not found');
			error.status = 404;
			return next(error);
		}

		let courses = plan.courses;
		let courseList = plan.courseList;
		async.each(courseIds, function(courseId, cb) {
			Requirement.findOne({content: courseId}, (err, requirement) => {
				if (err)
					cb(err);
				if (requirement === null) {
					var requirementdetail = {
						content: courseIds,
						contentModel: 'Course',
					}
				
					var newRequirement = new Requirement(requirementdetail);
					newRequirement.save((err, doc) => {
						if (err) {
							cb(err);
						}

						requirement = doc;
					})
				}

				courses.push(requirement.id);
				courseList.push(courseId);
				cb(null);
			})
		}, function (err) {
			if (err)
				next(err);

			plan.courses = courses;
			plan.courseList = courseList;

			plan.save((err, savedPlan) => {
				if (err)
					next(err);

				res.json({
					courses,
					courseList,
				});
			})
		})
	})
}

function course_remove(req, res, next) {
	const planId = req.params.id;
	const courseIds = req.body.courses;

	Plan.findById(planId)
	.exec((err, plan) => {
		if (err)
			return next(err);
		if (plan === null) {
			const error = new Error('Plan not found');
			error.status = 404;
			return next(error);
		}

		let courses = plan.courses;
		let courseList = plan.courseList;
		async.each(courseIds, function(courseId, cb) {
			Requirement.findOne({content: courseId}, (err, requirement) => {
				if (err)
					cb(err);
				if (requirement === null) {
					if (requirement === null) {
						const error = new Error('Requirement not found');
						error.status = 404;
						return next(error);
					}
				}

				courses.filter(requirementId => requirementId !== requirement.id);
				courseList.filter(course => course !== courseId);
				cb(null);
			})
		}, function (err) {
			if (err)
				next(err);

			plan.courses = courses;
			plan.courseList = courseList;

			plan.save((err, savedPlan) => {
				if (err)
					next(err);
					
				res.json({
					courses,
					courseList,
				});
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
	course_add,
	course_remove,
}