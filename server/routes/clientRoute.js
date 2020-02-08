import express from 'express';
import userSign from '../controllers/user';
import signupValid from '../middleware/validator'

const router = express.Router();

router.post('/auth/signup',signupValid,userSign.signup);

export default router;