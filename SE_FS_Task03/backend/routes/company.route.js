import express from 'express';
import { companyRegister, getCompanyById, getCompanyByUser, updateCompany } from '../controllers/company.controller.js';
import isAuthenticated from '../middlewires/isAuthenticate.js';
import { singleUpload } from '../middlewires/multer.js';

const router = express.Router();

router.route('/register').post(isAuthenticated, companyRegister);
router.route('/get').get(isAuthenticated, getCompanyByUser);
router.route('/get/:id').get(isAuthenticated, getCompanyById);
router.route('/update/:id').put(isAuthenticated, singleUpload, updateCompany);

export default router;