import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Hash } from 'crypto';
import pool from '../config/db-config';

dotenv.config();

class Reset {
  static async resetPassword(req, res) {
    const reseter = {
      email: req.body.email,
    };

    const emailGet = `SELECT * FROM users WHERE email = '${req.body.email}';`;
    const { rows: [emailGot] } = await pool.query(emailGet);
    if (!emailGot) {
      return res.status(400).json({
        status: 400,
        error: 'Email is not found in the database',
        path: 'email',
      });
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const resetToken = jwt.sign({
      reset: true,
      email: reseter.email,
    }, process.env.JWT_KEY, {
      expiresIn: '4h',
    });

    transporter.sendMail({
      from: 'papel.kigali@gmail.com',
      to: `${reseter.email}`,
      subject: 'Reseting password',
      html: `<p style="color: black; font-size: 18px;">Hey ${emailGot.firstname} ${emailGot.lastname}</p> 
             <p style="color: black; font-size: 16px;">Click on this link to reset your account password ${process.env.LINK}.</p>
             <p style="color: black; font-size: 14px">PLEASE COPY THE TOKEN: <br> <i style="color: blue;"> ${resetToken} </i></p>
             <p><i style="font-size: 16px;">N.B:</i> <i style="font-size: 14px;">This token wil EXPIRE in 4 hours, if it is not used!</i></p>`,
    });

    return res.status(200).json({
      status: 200,
      message: `Reset Email is already sent to ${reseter.email}`,
    });
  }

  static async getNewPassword(req, res) {
    const { email } = req.resetData;
    const newPassword = { password: await bcrypt.hash(req.body.password, 11) };

    const passUpdater = `UPDATE users SET password = '${newPassword.password}' WHERE email = '${email}';`;
    await pool.query(passUpdater);

    return res.status(200).json({
      status: 200,
      message: 'Password has updated',
    });
  }
}

export default Reset;
