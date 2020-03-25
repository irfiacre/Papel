import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import accountQueries from '../helpers/accounts.queries';
import transQueries from '../helpers/transQueries';

dotenv.config();
class Cashier {
  static async debitAccount(req, res) {
    const cashierId = req.userData.id;
    const amountCash = parseFloat(req.body.amount);
    const accountGet = await accountQueries.findByProp({ accountno: req.params.accountNo });

    if (!accountGet[0]) {
      return res.status(404).json({
        status: 404,
        error: 'account number not found',
      });
    }
    const rows2 = accountGet[0].dataValues;

    if (rows2.status === 'pending' || rows2.status === 'dormant') {
      return res.status(400).json({
        status: 400,
        error: 'account must be ACTIVATED to be used.',
      });
    }

    const oldBalance = rows2.balance;

    if (oldBalance === 0 || oldBalance <= amountCash) {
      return res.status(400).json({
        status: 400,
        error: 'INSUFFICIENT BALANCE ON THE ACCOUNT',
      });
    }
    const newBalance = oldBalance - amountCash;

    const transaction = {
      createdon: req.body.date,
      type: 'debit',
      cashierid: req.userData.id,
      accoutno: req.params.accountNo,
      amount: amountCash,
      oldbalance: oldBalance,
      newbalance: newBalance,
    };

    await accountQueries.updateAtt({ balance: newBalance }, { accountno: req.params.accountNo });


    const transInserter = await transQueries.insert(transaction);
    const transactionGet = transInserter.dataValues;

    let message = 'THANK YOU FOR USING PAPEL';
    let text = `
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
    const amountCash = parseFloat(req.body.amount);
    const accountGet = await accountQueries.findByProp({ accountno: req.params.accountNo });

    if (!accountGet[0]) {
      return res.status(404).json({
        status: 404,
        error: 'account number not found',
      });
    }
    const rows2 = accountGet[0].dataValues;


    if (rows2.status === 'pending' || rows2.status === 'dormant') {
      return res.status(400).json({
        status: 400,
        error: 'account must be ACTIVATED to be used.',
      });
    }

    const oldBalance = rows2.balance;
    const newBalance = oldBalance + amountCash;

    const transaction = {
      createdon: req.body.date,
      type: 'debit',
      cashierid: req.userData.id,
      accoutno: req.params.accountNo,
      amount: amountCash,
      oldbalance: oldBalance,
      newbalance: newBalance,
    };

    await accountQueries.updateAtt({ balance: newBalance }, { accountno: req.params.accountNo });

    const transInserter = await transQueries.insert(transaction);
    const transactionGet = transInserter.dataValues;

    let message = 'THANK YOU FOR USING PAPEL';
    let text = `
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
