import bcrypt from 'bcrypt';
import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import jwt from 'jsonwebtoken';
import { type } from 'os';
import pool from '../config/db-config';

class UserSign {
  static async signup(req, res) {
    const emailget = 'SELECT * FROM users WHERE email =$1';
    const { rows: [emailGot] } = await pool.query(emailget, [req.body.email]);
    if (emailGot) {
      return res.status(409).json({
        status: 409,
        message: 'Email already exists',
      });
    }

    const user = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: await bcrypt.hash(req.body.password, 10),
      type: 'client',
      is_admin: false,
    };

    const inserter = 'INSERT INTO users(email,firstname,lastname,password,type,is_admin) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;';

    const { rows } = await pool.query(inserter,
      [user.email, user.firstName, user.lastName, user.password, user.type, user.is_admin]);

    const userFind = rows.find((obj) => obj.id);
    const token = jwt.sign({
      id: userFind.id,
      email: userFind.email,
    }, 'jwtprivatekey');

    res.status(201).json({
      status: 201,
      data: {
        token,
        id: userFind.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      },
    });
  }


  static async signin(req, res) {
    const emailget = 'SELECT * FROM users WHERE email =$1';
    const { rows: [emailGot] } = await pool.query(emailget, [req.body.email]);
    if (!emailGot) {
      return res.status(404).json({
        status: 404,
        message: 'Email not Found',
      });
    }

    const getPassword = 'SELECT * FROM users  WHERE email = $1;';
    const { rows: [passwordGot] } = await pool.query(getPassword, [req.body.email]);

    const password = await bcrypt.compare(req.body.password, passwordGot.password);
    if (!password) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid Password',
      });
    }

    const user = {
      id: passwordGot.id,
      firstName: passwordGot.firstname,
      lastName: passwordGot.lastname,
      email: req.body.email,
    };

    const token = jwt.sign({
      id: passwordGot.id,
      email: passwordGot.email,
      firstName: user.firstName,
      lastName: user.lastName,
      type: passwordGot.type,
      is_admin: passwordGot.is_admin,
    }, 'jwtprivatekey');


    res.status(200).json({
      status: 200,
      data: {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  }

  static async createAccount(req, res) {
    const account = {
      createdOn: req.body.date,
      firstName: req.userData.firstName,
      lastName: req.userData.lastName,
      type: req.body.type,
    };
    let owner = `${account.firstName} ${account.lastName}`;
    let { email } = req.userData;


    if (account.type !== 'current' && account.type !== 'savings') {
      return res.status(400).json({
        status: 400,
        message: 'Account must either be savings or current',
      });
    }

    const inserter2 = 'INSERT INTO accounts(createdon,owner,email,type) VALUES($1,$2,$3,$4) RETURNING *;';

    const { rows } = await pool.query(inserter2,
      [account.createdOn, owner, email, account.type]);

    const accountGet = rows.find((obj) => obj.accountno);

    res.status(201).json({
      status: 201,
      data: {
        accountNumber: accountGet.accountno,
        firstName: account.firstName,
        lastName: account.lastName,
        email: accountGet.email,
        type: account.type,
        openingBalance: accountGet.balance,
      },
    });
  }

  static async viewAccounts(req, res) {
    let {email} = req.params;

    if (email !== req.userData.email) {
      return res.status(404).json({
        status: 404,
        error: 'Email not found in the Database',
      });
    }
    const accounts = `SELECT * FROM accounts WHERE email='${email}'`;
    const { rows } = await pool.query(accounts);

    const accountsArray = [];
    rows.forEach((account) => {
      const accountData = {
        createdOn: account.createdon,
        accountNumber: account.accountno,
        type: account.type,
        status: account.status,
        balance: account.balance,
      };
      accountsArray.push(accountData);
    });

    return res.status(200).json({
      status: 200,
      accounts: accountsArray,
    });
  }

  static async viewAccount(req, res) {
    let  email = req.userData.email;
    const accounts = `SELECT * FROM accounts WHERE email='${email}'`;
    const { rows } = await pool.query(accounts);
    if (isNaN(req.params.accountNo)) {
      return res.status(400).json({
        status: 400,
        error: 'The account number must be an integer',
      });
    }

    const accountFinder = rows.find((obj) => obj.accountno === parseInt(req.params.accountNo));
    if (!accountFinder) {
      return res.status(404).json({
        status: 404,
        error: 'Account Number not found.',
      });
    }

    let accountDetails = {
      createdOn: accountFinder.createdOn,
      accountNumber: accountFinder.accountno,
      ownerEmail: accountFinder.email,
      type: accountFinder.type,
      status: accountFinder.status,
      balance: accountFinder.balance,
    };
    res.status(200).json({
      status: 200,
      data: accountDetails,
    });
  }
}

export default UserSign;
