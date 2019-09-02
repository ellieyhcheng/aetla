'use strict';

var User = require('../models/User');

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
	User.findOne({uid: req.params.id})
	.populate('plans')
    .exec((err, user) => {
        if (err)
			return next(err);
		if (user === null) {
			const error = new Error('User not found');
			error.status = 404;
			return next(error);
		}
		
        res.json(user);
    })
}

// Handle user create on POST
function user_create_post(req, res, next) {
	res.send('NOT IMPLEMENTED: User create POST')
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