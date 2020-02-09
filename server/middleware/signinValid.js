import Joi from 'joi';

const signinValidator = (req, res, next) => {
  const schema = {

    password: Joi.string().alphanum().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),

  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(422).json({
      status: 422,
      error: error.details[0].message,
    });
  }
  next();
};

export default signinValidator;
