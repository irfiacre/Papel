import express from 'express';
import reseting from '../controllers/resetPassword';
import validator from '../middleware/resetValid';
import resetChecker from '../middleware/resetCheck';

const router = express.Router();

router.post('/reset', validator, reseting.resetPassword);
router.post('/reset/new', [resetChecker.resetCheck, resetChecker.passwordValid], reseting.getNewPassword);

export default router;
