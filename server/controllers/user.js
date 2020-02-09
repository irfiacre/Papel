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
      password: bcrypt.hash(req.body.password, 10),
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
}

export default UserSign;
