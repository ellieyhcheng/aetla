'use strict';

const decoder = require('../auth');
const express = require('express');
let router = express.Router();

const planController = require('../controllers/PlanController');
const catalogController = require('../controllers/CatalogController');
const courseController = require('../controllers/CourseController');
const requirementController = require('../controllers/RequirementController');
const electiveController = require('../controllers/ElectiveController');

router.use(decoder.token);

router.get('/course/:subject', courseController.course_by_subject);

router.get('/plans', planController.plan_all);
router.post('/plan/create', planController.plan_create);
router.delete('/plan/:id/delete', planController.plan_delete);
router.put('/plan/:id/update', planController.plan_update);
router.post('/plan/:id/copy', planController.plan_copy);
router.get('/plan/:id', planController.plan_detail);
router.put('/plan/:id/settings', planController.plan_settings);

module.exports = router;