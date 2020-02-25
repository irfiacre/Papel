import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();


const authorisation = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  }catch(error) {
    return res.status(401).json({
      status: 401,
      error: 'Unauthorised Access: You have to login to Proceed',
    });
  }
};

export default authorisation;
