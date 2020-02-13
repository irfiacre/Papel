import bcrypt from 'bcrypt';
import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import jwt from 'jsonwebtoken';
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
    let {rows: [rows2]} = await pool.query(account);

    if (!rows2) {
      return res.status(404).json({
        status: 404,
        error: 'Account is not found',
      });
    }
    
    const status = {
      status: req.body.status,
    };

    if (status.status !== 'active' && status.status !== 'dormant') {
      return res.status(400).json({
        status: 400,
        message: 'status must either be active or dormat',
      });
    }

      const updater = ` UPDATE accounts  SET status = '${status.status}' WHERE accountno ='${accountNumber}';`;
      await pool.query(updater);
      const accountQuery = `SELECT * FROM accounts WHERE status = '${status.status}';`;
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

  static async createStaffAccount(req, res) {
    const emailget = 'SELECT * FROM users WHERE email =$1';
    const { rows: [emailGot] } = await pool.query(emailget, [req.body.email]);
    if (emailGot) {
      return res.status(409).json({
        status: 409,
        message: 'Email already exists',
      });
    }

    const newStaff = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: await bcrypt.hash(req.body.password, 10),
      type: 'staff',
      is_admin: req.body.is_admin,
    };
    
    
    const staffInserter = 'INSERT INTO users(email,firstname,lastname,password,type,is_admin) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;';
    const { rows } = await pool.query(staffInserter,
      [newStaff.email, newStaff.firstName, newStaff.lastName, newStaff.password, newStaff.type, newStaff.is_admin]);

    const staff = rows.find((obj) => obj.id);
    
    const token = jwt.sign({
      id: staff.id,
      email: staff.email,
      firstName: staff.firstName,
      lastName: staff.lastName,
      type: staff.type,
      is_admin: staff.is_admin,
    }, 'jwtprivatekey');

    return res.status(201).json({
      status: 201,
      data: {
        token,
        id: staff.id,
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        type: 'staff',
        is_admin: staff.is_admin,
      },
    });
  }
}
export default Admin;
