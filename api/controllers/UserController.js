'use strict';

var User = require('../models/User');
const {body, validationResult } = require('express-validator');
const {sanitizeBody} = require('express-validator');

// Display all users
function user_all(req, res, next) {
	User.find()
    .exec((err, users) => {
        if (err)
            return next(err);
        res.send(users);
    })
}

// Display details of a user
function user_detail(req, res, next) {
	User.findOne({uid: req.uid})
	.populate('plans')
    .exec((err, user) => {
        if (err)
			return next(err);
		if (user === null) {
			const error = new Error('User not found');
			error.status = 404;
			return next(error);
		}
		const result = user.toObject();
		const abbrevPlans = user.plans.map(plan => {
			return {
				"_id": plan["_id"],
				title: plan.title,
				description: plan.description,
			}
		})

		result.plans = abbrevPlans;
		
        res.json(result);
    })
}

// Handle user create on POST
function user_create_post(req, res, next) {
	if (!(req.body.plans instanceof Array)) {
		if (typeof req.body.plans === 'undefined')
			req.body.plans=[];
		else
			req.body.plans = new Array(req.body.plans);
	}

	body('school', 'Schoool must not be empty.').isLength({ min: 1 }).trim();
	body('uid', 'uid must not be empty.').isLength({ min: 1}).trim();
	
	sanitizeBody('*').escape();

	const errors = validationResult(req);

	var user_details = new User({
		uid: req.body.uid,
		school: req.body.school,
		plans: req.body.plans,
	})

	if (!errors.isEmpty()) {
		const error = new Error('Error creating user because bad inputs');
		error.status = 404;
		return next(error);
	}

	user_details.save((err, result) => {
		if (err) {
			return next(err);
		}
		res.json(result);
	})
}

// Handle user delete on POST
function user_delete_post(req, res, next) {
	res.send('NOT IMPLEMENTED: User delete POST')
}


// Handle user update on POST
function user_update_post(req, res, next) {

	User.findOne({uid: req.params.id})
	.exec((err, user) => {
		if (err)
			return next(err);
		if (user === null) {
			const error = new Error('User not found');
			error.status = 404;
			return next(error);
		}
		user.plans = req.body.plans;
		user.school = req.body.school;	

		user.save()
		.then(user => {
			res.json('User updated!');
		})
		.catch(err => {
			console.log(err)
			return next(err);
		})
	})
}


module.exports = {
    user_all,
	user_detail,
	user_create_post,
	user_delete_post,
	user_update_post,
}