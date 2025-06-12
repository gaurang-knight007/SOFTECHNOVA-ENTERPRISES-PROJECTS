import express from 'express';
import isAuthenticated from '../middlewires/isAuthenticate.js';
import { applyJob, getApplicationByUser, getApplicationsByAdmin, updateStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.route('/apply/:id').get(isAuthenticated, applyJob);
router.route('/get').get(isAuthenticated, getApplicationByUser);
router.route('/get/:id').get(isAuthenticated, getApplicationsByAdmin);
router.route('/status/:id/update').put(isAuthenticated, updateStatus);

export default router;