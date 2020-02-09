import bcrypt from 'bcrypt';
import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import jwt from 'jsonwebtoken';
import pool from '../config/db-config';

class UserSign {
  static async signup(req, res) {
    const emailget = 'SELECT * FROM users WHERE email =$1';
    const { rows: [emailGot] } = await pool.query(emailget, [req.body.email]);
    if (emailGot) {
      return res.status(422).json({
        status: 422,
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
      return res.status(422).json({
        status: 422,
        message: 'Invalid email address',
      });
    }

    const getPassword = 'SELECT * FROM users  WHERE email = $1;';
    const { rows: [passwordGot] } = await pool.query(getPassword, [req.body.email]);
    
    const password = await bcrypt.compare(req.body.password, passwordGot.password);
    if (!password) {
      return res.status(422).json({
        status: 422,
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
}

export default UserSign;
