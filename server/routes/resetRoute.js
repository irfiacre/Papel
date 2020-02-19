import express from 'express';
import reseting from '../controllers/resetPassword';
import validator from '../middleware/resetValid';

const router = express.Router();

router.post('/reset', validator, reseting.resetPassword);

export default router;
