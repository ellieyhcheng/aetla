'use strict';

const decoder = require('../auth');
const express = require('express');
let router = express.Router();

const userController = require('../controllers/UserController');

router.use(decoder.token);

router.get('/all', userController.user_all);
router.post('/create', userController.user_create_post);
router.delete('/delete', userController.user_delete);
router.post('/update', userController.user_update_post);
router.get('/', userController.user_detail);

module.exports = router;