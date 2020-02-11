import express from 'express';
import signupValid from '../middleware/signupValid';
import signinValid from '../middleware/signinValid';
import authorisation from '../middleware/authorisation';
import accountValid from '../middleware/accountValid';
import UserSign from '../controllers/user';

const router = express.Router();

router.post('/auth/signup', signupValid, UserSign.signup);
router.post('/auth/signin', signinValid, UserSign.signin);
router.post('/accounts', [authorisation, accountValid], UserSign.createAccount);
router.get('/user/:email/accounts', authorisation, UserSign.viewAccounts);
router.get('/accounts/:accountNo', authorisation, UserSign.viewAccount);
router.get('/accounts/:accountNo/transactions', authorisation, UserSign.accountHistory);
router.get('/transactions/:transactionId', authorisation, UserSign.specificAccount);

export default router;
