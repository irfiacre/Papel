import Joi from 'joi';

const signinValidator = (req, res, next) => {
  const schema = {

    password: Joi.string().alphanum().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),

  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    if (error.details[0].message.replace('/', '').replace(/"/g, '').includes('email')) {
      return res.status(400).json({
        status: 400,
        error: {
          error: error.details[0].message.replace('/', '').replace(/"/g, ''),
          example: 'xxx@yyy.zzz',
        },
        path: error.details[0].path[0],
      });
    }
    return res.status(400).json({
      status: 400,
      error: error.details[0].message.replace('/', '').replace(/"/g, ''),
      path: error.details[0].path[0],
    });
  }
  next();
};

export default signinValidator;
