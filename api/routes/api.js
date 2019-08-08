'use strict';

const express = require('express');
let router = express.Router();

const planController = require('../controllers/PlanController');
const catalogController = require('../controllers/CatalogController');
const courseController = require('../controllers/CourseController');

router.get('/courses', courseController.course_all);
router.get('/course/:id', courseController.course_detail);

router.get('/catalogs', catalogController.catalog_all);
router.get('/catalog/:id', catalogController.catalog_detail);

router.get('/plans', planController.plan_all);
router.get('/plan/create', planController.plan_create_get);
router.post('/plan/create', planController.plan_create_post);
router.get('/plan/:id/delete', planController.plan_delete_get);
router.post('/plan/:id/delete', planController.plan_delete_post);
router.get('/plan/:id/update', planController.plan_update_get);
router.post('/plan/:id/update', planController.plan_update_post);
router.get('/plan/:id', planController.plan_detail);


module.exports = router;