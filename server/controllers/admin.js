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
}

export default Admin;
