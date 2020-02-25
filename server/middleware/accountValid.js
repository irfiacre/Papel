import Joi from 'joi';

const accountValidator = (req, res, next) => {
  const schema = {

    date: Joi.date().iso().required(),
    type: Joi.string().alphanum({ minDomainSegments: 2 }).required(),

  };
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: 'Incorrect Date format please use YYYY-MM-DD',
      path: error.details[0].path[0],
    });
  }
  next();
};

export default accountValidator;
