'use strict';

const express = require('express');
let router = express.Router();

const planController = require('../controllers/PlanController');
const catalogController = require('../controllers/CatalogController');
const courseController = require('../controllers/CourseController');
const requirementController = require('../controllers/RequirementController');
const electiveController = require('../controllers/ElectiveController');

router.get('/courses', courseController.course_all);
router.get('/course/:id', courseController.course_detail);

router.get('/electives', electiveController.elective_all);
router.get('/elective/:id', electiveController.elective_detail);

router.get('/requirements', requirementController.requirement_all);
router.get('/requirement/:id', requirementController.requirement_detail);

router.get('/catalogs', catalogController.catalog_all);
router.get('/catalog/:id', catalogController.catalog_detail);

router.get('/plans', planController.plan_all);
router.post('/plan/create', planController.plan_create_post);
router.post('/plan/:id/delete', planController.plan_delete_post);
router.post('/plan/:id/update', planController.plan_update_post);
router.get('/plan/:id', planController.plan_detail);


module.exports = router;