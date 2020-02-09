import express from 'express';
import signupValid from '../middleware/signupValid';
import signinValid from '../middleware/signinValid';
import UserSign from '../controllers/user';

const router = express.Router();

router.post('/auth/signup', signupValid, UserSign.signup);
router.post('/auth/signin', signinValid, UserSign.signin);

export default router;
