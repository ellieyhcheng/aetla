'use strict';

const express = require('express');
let router = express.Router();

const userController = require('../controllers/UserController');

router.get('/all', userController.user_all);
router.post('/:id/create', userController.user_create_post);
router.post('/:id/delete', userController.user_delete_post);
router.post('/:id/update', userController.user_update_post);
router.get('/', userController.user_detail);

module.exports = router;