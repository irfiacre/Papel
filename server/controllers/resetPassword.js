import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
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
      });
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });


    transporter.sendMail({
      from: 'papel.kigali@gmail.com',
      to: `${reseter.email}`,
      subject: 'Reseting password',
      text: `Hey ${emailGot.firstname} ${emailGot.lastname} Click on this link to reset your account password ${process.env.LINK}`,
    });

    return res.status(200).json({
      status: 200,
      message: `Reset Email is already sent to ${reseter.email}`,
    });
  }
}

export default Reset;
