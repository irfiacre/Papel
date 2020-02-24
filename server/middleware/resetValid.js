import Joi from 'joi';

const resetValidator = (req, res, next) => {
  const schema = {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: {
        error: error.details[0].message.replace('/', '').replace(/"/g, ''),
        example: 'xxx@yyy.zzz',
      },
      path: error.details[0].path[0],
    });
  }
  next();
};

export default resetValidator;
