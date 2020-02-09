import express from 'express';
import signupValid from '../middleware/validator'
import UserSign from '../controllers/user';

const router = express.Router();

router.post('/auth/signup', signupValid, UserSign.signup);

export default router;
