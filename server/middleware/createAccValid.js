import Joi from 'joi';

const signupValidator = (req, res, next) => {
  const schema = {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    is_admin: Joi.boolean(),
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message.replace('/', '').replace(/"/g, ''),
    });
  }
  next();
};

export default signupValidator;