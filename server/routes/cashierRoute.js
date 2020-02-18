import express from 'express';
import cashier from '../controllers/cashier';
import authorisation from '../middleware/authorisation';
import cashierValid from '../middleware/cashierCheck';

const router = express.Router();

router.post('/transactions/:accountNo/debit', [authorisation, cashierValid.cashierCheck, cashierValid.cashierValid], cashier.debitAccount);
router.post('/transactions/:accountNo/credit', [authorisation, cashierValid.cashierCheck, cashierValid.cashierValid], cashier.creditAccount);

export default router;
