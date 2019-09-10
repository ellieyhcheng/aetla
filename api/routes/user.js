'use strict';

const express = require('express');
let router = express.Router();

const userController = require('../controllers/UserController');

router.get('/all', userController.user_all);
router.post('/create', userController.user_create_post);
router.post('/delete', userController.user_delete_post);
router.post('/update', userController.user_update_post);
router.get('/', userController.user_detail);

module.exports = router;