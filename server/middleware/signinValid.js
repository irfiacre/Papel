import Joi from 'joi';

const signinValidator = (req, res, next) => {
  const schema = {

    password: Joi.string().alphanum().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),

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

export default signinValidator;
