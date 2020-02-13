import express from 'express';
import admin from '../controllers/admin';
import adminCheck from '../middleware/checkAdmin';
import createValid from '../middleware/createAccValid';
import authorisation from '../middleware/authorisation';

const router = express.Router();

router.get('/accounts', [authorisation, adminCheck], admin.viewBankAccounts);
router.patch('/account/:accountNo', [authorisation, adminCheck], admin.updateAccount);
router.delete('/accounts/:accountNo', [authorisation, adminCheck], admin.deleteAccount);
router.post('/auth/create', [authorisation, createValid], admin.createStaffAccount);


export default router;
