import express from 'express'
import isAuthenticated from '../middlewires/isAuthenticate.js'
import { addToWishlist, findJobById, getAllJobs, getJobFromWishList, jobAdminCreated, postJob, removeFromWishlist } from '../controllers/job.controller.js';
const router = express.Router();

router.route('/post').post(isAuthenticated, postJob);
router.route('/get').get(isAuthenticated, getAllJobs);
router.route('/getbyid/:id').get(isAuthenticated, findJobById);
router.route('/getadminjobs').get(isAuthenticated, jobAdminCreated);
router.route('/getfromwishlist').get(isAuthenticated, getJobFromWishList);
router.route('/addtowishlist/:id').get(isAuthenticated, addToWishlist);
router.route('/removewishlist/:id').get(isAuthenticated, removeFromWishlist);

export default router;