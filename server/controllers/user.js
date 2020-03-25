import bcrypt from 'bcrypt';
import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import validator from 'validator';
import userQueries from '../helpers/users.queries';
import accountQueries from '../helpers/accounts.queries';
import transQueries from '../helpers/transQueries';

dotenv.config();

class UserSign {
  static async signup(req, res) {
    const emailGot = await userQueries.findByProp({ email: req.body.emails });
    if (emailGot[0]) {
      return res.status(409).json({
        status: 409,
        error: 'Email already exists',
        path: 'emails',
      });
    }

    if (!validator.isEmail(req.body.emails)) {
      return res.status(400).json({
        status: 200,
        error: {
          error: 'Incorrect email address format',
          example: 'xxx@yyy.zzz',
        },
        path: 'emails',
      });
    }
    const user = {
      email: req.body.emails,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      password: await bcrypt.hash(req.body.passwords, 10),
      type: 'client',
      is_admin: false,
    };

    const inserter = await userQueries.insert(user);

    const userFind = inserter.dataValues;
    const token = jwt.sign({
      id: userFind.id,
      email: userFind.email,
    }, process.env.JWT_KEY, {
      expiresIn: '4h',
    });

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
    const emailGot = await userQueries.findByProp({ email: req.body.email });

    if (!emailGot[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Email not Found',
        path: 'email',
      });
    }
    const password = await bcrypt.compare(req.body.password, emailGot[0].dataValues.password);
    if (!password) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid Password',
        path: 'password',
      });
    }

    const user = {
      id: emailGot.id,
      firstName: emailGot.firstname,
      lastName: emailGot.lastname,
      email: req.body.email,
    };

    const token = jwt.sign({
      id: emailGot.id,
      email: emailGot.email,
      firstName: user.firstName,
      lastName: user.lastName,
      type: emailGot.type,
      is_admin: emailGot.is_admin,
    }, process.env.JWT_KEY, {
      expiresIn: '1d',
    });

    res.status(200).json({
      status: 200,
      data: {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: emailGot.type,
        is_admin: emailGot.is_admin,
      },
    });
  }

  static async createAccount(req, res) {
    const accountNumb = () => {
      let bankNumb = parseInt(req.body.date);
      let userId = req.userData.id;
      let bankNumb2 = `${bankNumb}${userId}`;
      let id = parseInt((Math.random() * 10000) + 1);
      let id2 = `${id}`;
      let sum = parseInt(bankNumb2.concat(id2));
      return sum;
    };

    const account = {
      accountno: accountNumb(),
      createdon: req.body.date,
      owner: `${req.userData.firstName} ${req.userData.lastName}`,
      email: req.userData.email,
      type: req.body.type,
    };


    if (account.type !== 'current' && account.type !== 'savings') {
      return res.status(400).json({
        status: 400,
        error: 'Account must either be savings or current',
        path: 'type',
      });
    }

    const inserter2 = await accountQueries.insert(account);

    const accountGet = inserter2.dataValues;

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
    let { email } = req.params;

    if (email !== req.userData.email) {
      return res.status(404).json({
        status: 404,
        error: 'Email not found in the Database',
        path: 'email',
      });
    }
    const accounts = await accountQueries.findByProp({ email: req.params.email });

    const accountsArray = [];
    accounts.forEach((account) => {
      const accountData = {
        createdOn: account.dataValues.createdon,
        accountNumber: account.dataValues.accountno,
        type: account.dataValues.type,
        status: account.dataValues.status,
        balance: account.dataValues.balance,
      };
      accountsArray.push(accountData);
    });

    return res.status(200).json({
      status: 200,
      accounts: accountsArray,
    });
  }

  static async viewAccount(req, res) {
    if (isNaN(req.params.accountNo)) {
      return res.status(400).json({
        status: 400,
        error: 'The account number must be an integer',
      });
    }

    const accounts = await accountQueries.findByProp({
      email: req.userData.email,
      accountno: req.params.accountNo,
    });

    if (!accounts[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Account number not found',
        path: 'accountNo',
      });
    }
    const accountFinder = accounts.find((obj) => obj.accountno === parseInt(req.params.accountNo));
    if (!accountFinder) {
      return res.status(404).json({
        status: 404,
        error: 'Account Number not found.',
        path: 'accountNo',
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

  static async accountHistory(req, res) {
    if (isNaN(req.params.accountNo)) {
      return res.status(400).json({
        status: 400,
        error: 'The account number must be an integer',
        path: 'accountNo',
      });
    }

    const account = await transQueries.findByProp({ accoutno: req.params.accountNo });

    if (!account[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Account number is not found',
        path: 'accountNo',
      });
    }

    const transactionsArray = [];
    account.forEach((transaction) => {
      const transactionData = {
        transactionId: transaction.dataValues.id,
        createdOn: transaction.dataValues.createdOn,
        type: transaction.dataValues.type,
        accountNumber: transaction.dataValues.accoutno,
        amount: transaction.dataValues.amount,
        oldBalance: transaction.dataValues.oldbalance,
        newBalance: transaction.dataValues.newbalance,
      };
      transactionsArray.push(transactionData);
    });

    return res.status(200).json({
      status: 200,
      data: transactionsArray,
    });
  }

  static async specificAccount(req, res) {
    const transId = parseInt(req.params.transactionId);

    if (isNaN(transId)) {
      return res.status(400).json({
        status: 400,
        error: 'The Transaction Id must be an integer',
        path: 'transactionId',
      });
    }

    const transQuery = await transQueries.findByProp({ id: req.params.transactionId });
    if (!transQuery[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Transaction is not found',
        path: 'transactionId',
      });
    }

    const transFind = transQuery.find((obj) => obj.id === parseInt(req.params.transactionId));

    const transaction = {
      transactionId: transFind.id,
      createdOn: transFind.createdOn,
      type: transFind.type,
      accountNumber: transFind.accountno,
      amount: transFind.amount,
      oldBalance: transFind.oldbalance,
      newBalance: transFind.newbalance,
    };
    return res.status(200).json({
      status: 200,
      data: transaction,
    });
  }
}

export default UserSign;
