import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import pool from '../config/db-config';

dotenv.config();
class Cashier {
  static async debitAccount(req, res) {
    const cashierId = req.userData.id;

    const getCashier = `SELECT * FROM users WHERE id= '${cashierId}';`;
    const { rows: [cashierGet] } = await pool.query(getCashier);


    const transaction = {
      date: req.body.date,
      type: 'debit',
      accountNumber: req.params.accountNo,
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


    const updater = `UPDATE accounts SET balance = '${newBalance}' WHERE accountno ='${transaction.accountNumber}';`;
    await pool.query(updater);
    const transInserter = 'INSERT INTO transactions(createdon,type,cashierid,accountno,amount,oldbalance,newbalance) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;';
    const { rows: [transactionGet] } = await pool.query(transInserter,
      [transaction.date, transaction.type, cashierId, transaction.accountNumber, transaction.amount, oldBalance, newBalance]);

    let message = 'THANK YOU FOR USING PAPEL';
    let text = `;
        Date: ${transactionGet.createdon}
        Cashier: ${transactionGet.cashierid}
        Amount: ${transactionGet.amount}
        Balance: ${transactionGet.newbalance}
        ${message},
      `;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    transporter.sendMail({
      from: 'papel.kigali@gmail.com',
      to: `${rows2.email}`,
      subject: `WITHDRAWAL FROM ${transactionGet.accountno}`,
      text: `${text}`,
    });

    return res.status(200).json({
      status: 200,
      data: {
        message: `Transaction email sent to ${rows2.email}`,
        transactionid: transactionGet.id,
        accountNumber: transactionGet.accountno,
        amount: transactionGet.amount,
        cashier: cashierId,
        transactiontype: transactionGet.type,
        accountbalance: transactionGet.newbalance,
      },
    });
  }


  static async creditAccount(req, res) {
    const cashierId = req.userData.id;

    const getCashier = `SELECT * FROM users WHERE id= '${cashierId}';`;
    const { rows: [cashierGet] } = await pool.query(getCashier);

    const transaction = {
      date: req.body.date,
      type: 'credit',
      accountNumber: req.params.accountNo,
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
    const newBalance = oldBalance + transaction.amount;


    const updater = `UPDATE accounts SET balance = '${newBalance}' WHERE accountno ='${transaction.accountNumber}';`;
    await pool.query(updater);
    const transInserter = 'INSERT INTO transactions(createdon,type,cashierid,accountno,amount,oldbalance,newbalance) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;';
    const { rows: [transactionGet] } = await pool.query(transInserter,
      [transaction.date, transaction.type, cashierId, transaction.accountNumber, transaction.amount, oldBalance, newBalance]);


    let message = 'THANK YOU FOR USING PAPEL';
    let text = `;
        Date: ${transactionGet.createdon}
        Cashier: ${transactionGet.cashierid}
        Amount: ${transactionGet.amount}
        Balance: ${transactionGet.newbalance}
        ${message},
      `;

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    transporter.sendMail({
      from: 'papel.kigali@gmail.com',
      to: `${rows2.email}`,
      subject: `DEPOSIT FROM ${transactionGet.accountno}`,
      text: `${text}`,
    });

    return res.status(200).json({
      status: 200,
      data: {
        message: `Transaction email sent to ${rows2.email}`,
        transactionid: transactionGet.id,
        accountNumber: transactionGet.accountno,
        amount: transactionGet.amount,
        cashier: cashierId,
        transactiontype: transactionGet.type,
        accountbalance: transactionGet.newbalance,
      },
    });
  }
}

export default Cashier;
