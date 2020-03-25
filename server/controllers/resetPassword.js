import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userQueries from '../helpers/users.queries';
import accountQueries from '../helpers/accounts.queries';

dotenv.config();

class Reset {
  static async resetPassword(req, res) {
    const reseter = {
      email: req.body.email,
    };
    const emailGet = await userQueries.findByProp({ email: reseter.email });

    if (!emailGet[0]) {
      return res.status(400).json({
        status: 400,
        error: 'Email is not found in the database',
        path: 'email',
      });
    }

    const emailGot = emailGet[0].dataValues;

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

    await accountQueries.updateAtt({ password: newPassword.password }, { email });
    return res.status(200).json({
      status: 200,
      message: 'Password has updated',
    });
  }
}

export default Reset;
