import bcrypt from 'bcrypt';
import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import { type } from 'os';
import pool from '../config/db-config';

class Admin {
  static async viewBankAccounts(req, res) {
    const accountsQuery = 'SELECT * FROM accounts';
    const { rows } = await pool.query(accountsQuery);

    const accountsArray2 = [];
    rows.forEach((account2) => {
      const accountData2 = {
        createdOn: account2.createdon,
        accountNumber: account2.accountno,
        ownerEmail: account2.email,
        type: account2.type,
        status: account2.status,
        balance: account2.balance,
      };
      accountsArray2.push(accountData2);
    });
    return res.status(200).json({
      status: 200,
      accounts: accountsArray2,
    });
  }

  static async updateAccount(req, res) {
    const accountNumber = parseInt(req.params.accountNo);

    if (isNaN(accountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'The account number must be an integer',
      });
    }
    const account = `SELECT * FROM accounts WHERE accountno ='${accountNumber}'`;
    const { rows } = await pool.query(account);
    
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Account is not found',
      });
    }
    
    const accountGet = rows.find((obj) => obj.accountno === parseInt(req.params.accountNo));

    if (accountGet.status !== 'ACTIVE') {
      const updater = ` UPDATE accounts  SET status = 'ACTIVE' WHERE accountno ='${accountNumber}';`;
      await pool.query(updater);
      const accountQuery = 'SELECT * FROM accounts WHERE status = \'ACTIVE\';';
      const { rows } = await pool.query(accountQuery);

      const accountGet1 = rows.find((obj) => obj.accountno === parseInt(req.params.accountNo));

      res.status(200).json({
        status: 200,
        data: {
          accountNumber: accountGet1.accountno,
          status: accountGet1.status,
        },
      });
    }


    if (accountGet.status === 'ACTIVE') {
      const updater2 = ` UPDATE accounts  SET status = 'DORMANT' WHERE accountno ='${accountNumber}';`;
      await pool.query(updater2);

      const accountQuery2 = 'SELECT * FROM accounts WHERE status = \'DORMANT\';';
      const { rows } = await pool.query(accountQuery2);

      const accountGet2 = rows.find((obj) => obj.accountno === parseInt(req.params.accountNo));
      return res.status(200).json({
        status: 200,
        data: {
          accountNumber: accountGet2.accountno,
          status: accountGet2.status,
        },
      });
    }
  }

  static async deleteAccount(req, res) {
    const accountNumber = parseInt(req.params.accountNo);
    
    if (isNaN(accountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'The account number must be an integer',
      });
    }

    const accountCheck = `SELECT * FROM accounts WHERE accountno='${accountNumber}';`;
    const { rows } = await pool.query(accountCheck);
    
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Account is not found',
      });
    }

    const acQuery = `DELETE FROM accounts WHERE accountno='${accountNumber}';`;
    await pool.query(acQuery);

    return res.status(200).json({
      status: 200,
      message: `Account ${accountNumber} is successfully DELETED`,
    });
  }
}
export default Admin;
