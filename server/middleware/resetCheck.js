import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Joi from 'joi';


dotenv.config();

class ResetChecking {
  static async resetCheck(req, res, next) {
    try {
      const token = req.headers.authorization;

      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.resetData = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorised Access: You must provide the token',
      });
    }
  }

  static async passwordValid(req, res, next) {
    const schema = {
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    };
    const { error } = Joi.validate(req.body, schema);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace('/', '').replace(/"/g, ''),
        path: error.details[0].path[0],
      });
    }
    next();
  }
}

export default ResetChecking;
