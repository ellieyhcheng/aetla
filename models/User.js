'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema Definition
var UserSchema = new Schema({
	plans: [{ type: Schema.Types.ObjectId, ref: 'Plan'}],
	uid: {type: Schema.Types.String, required: true},
	school: {type: Schema.Types.String, required: true},
});

module.exports = mongoose.model('User', UserSchema);
