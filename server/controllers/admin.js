import bcrypt from 'bcrypt';
import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import Queries from '../helpers/users.queries';
import accountQueries from '../helpers/accounts.queries';

class Admin {
  static async viewBankAccounts(req, res) {
    if (req.query.status) {
      let statusk = req.query.status;
      if (statusk !== 'active' && statusk !== 'dormant' && statusk !== 'pending') {
        return res.status(400).json({
          status: 400,
          message: 'status must either be active or dormat',
        });
      }

      const accountsQuery = await accountQueries.findByProp({ status: statusk });

      const accountsArray3 = [];
      accountsQuery.forEach((account) => {
        const accountData3 = {
          createdOn: account.createdon,
          accountNumber: account.accountno,
          ownerEmail: account.email,
          type: account.type,
          status: account.status,
          balance: account.balance,
        };
        accountsArray3.push(accountData3);
      });

      return res.status(200).json({
        status: 200,
        accounts: accountsArray3,
      });
    }

    const accountsQuery2 = await accountQueries.findALL();

    const accountsArray2 = [];
    accountsQuery2.forEach((account) => {
      const accountData2 = {
        createdOn: account.createdon,
        accountNumber: account.accountno,
        ownerEmail: account.email,
        type: account.type,
        status: account.status,
        balance: account.balance,
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

    const account = await accountQueries.findByProp({ accountno: accountNumber });

    if (!account[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Account is not found',
      });
    }

    const rows2 = account[0].dataValues;

    const { status } = req.body;

    if (rows2.status === `${status}`) {
      return res.status(400).json({
        status: 400,
        error: `${rows2.accountno} Is already ${status}`,
      });
    }

    if (status !== 'active' && status !== 'dormant') {
      return res.status(400).json({
        status: 400,
        message: 'status must either be active or dormat',
      });
    }
    await accountQueries.updateAtt({ status }, { accountno: accountNumber });
    const account2 = await accountQueries.findByProp({ accountno: accountNumber });
    const rows3 = account2[0].dataValues;

    res.status(200).json({
      status: 200,
      data: {
        accountNumber: rows3.accountno,
        status: rows3.status,
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

    const account = await accountQueries.findByProp({ accountno: accountNumber });

    if (!account[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Account is not found',
      });
    }
    const rows2 = account[0].dataValues;

    await accountQueries.deleteAtt({ accountno: accountNumber })

    return res.status(200).json({
      status: 200,
      message: `Account ${rows2.accountno} is successfully DELETED`,
    });
  }

  static async createStaffAccount(req, res) {
    const emailGot = await Queries.findByProp({ email: req.body.email });
    if (emailGot[0]) {
      return res.status(409).json({
        status: 409,
        message: 'Email already exists',
      });
    }

    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({
        status: 200,
        error: {
          error: 'Incorrect email address format',
          example: 'xxx@yyy.zzz',
        },
        path: 'emails',
      });
    }

    const newStaff = {
      email: req.body.email,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      password: await bcrypt.hash(req.body.password, 10),
      type: req.body.type,
      is_admin: req.body.is_admin,
    };

    if (newStaff.type !== 'cashier' && newStaff.type !== 'staff') {
      return res.status(400).json({
        status: 400,
        message: 'type must either be cashier or staff',
      });
    }

    const staffInserter = await Queries.insert(newStaff);

    const staff = staffInserter.dataValues;

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
        type: staff.type,
        is_admin: staff.is_admin,
      },
    });
  }
}
export default Admin;
