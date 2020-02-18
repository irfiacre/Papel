import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import pool from '../config/db-config';

class Cashier {
  static async debitAccount(req, res) {
    const cashierId = req.userData.id;

    const getCashier = `SELECT * FROM users WHERE id= '${cashierId}';`;
    const { rows: [cashierGet] } = await pool.query(getCashier);
   


    const transaction = {
      date: req.body.date,
      type: 'debit',
      accountnNumber: req.params.accountNo,
      cashier: cashierGet.id,
      amount: parseFloat(req.body.amount),
    };


    const accountGet = `SELECT * FROM accounts WHERE accountno = '${req.params.accountNo}';`;
    const { rows: [rows2] } = await pool.query(accountGet);
    if (!rows2) {
      return res.status(404).json({
        status: 404,
        error: 'account number not found',
      });
    }


    if (rows2.status === 'DRAFT' || rows2.status === 'dormant') {
      return res.status(400).json({
        status: 400,
        error: 'account must be ACTIVATED to be used.',
      });
    }

    const oldBalance = rows2.balance;

    if (oldBalance === 0 || oldBalance <= transaction.amount) {

      return res.status(400).json({
        status: 400,
        error: 'INSUFFICIENT BALANCE ON THE ACCOUNT',
      });
    }
    const newBalance = oldBalance - transaction.amount;


    const updater = `UPDATE accounts SET balance = '${newBalance}' WHERE accountno ='${transaction.accountnNumber}';`;
    await pool.query(updater);
    const transInserter = 'INSERT INTO transactions(createdon,type,cashierid,accountno,amount,oldbalance,newbalance) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;';
    const { rows: [transactionGet] } = await pool.query(transInserter,
      [transaction.date, transaction.type, cashierId, transaction.accountnNumber, transaction.amount, oldBalance, newBalance]);



    return res.status(200).json({
      status: 200,
      data: {
        transactionid: transactionGet.id,
        accountnNumber: transactionGet.accountno,
        amount: transactionGet.amount,
        cashier: cashierId,
        transactiontype: transactionGet.type,
        accountbalance: transactionGet.newbalance,


      },


    });
  }
}

export default Cashier;
