import Joi from 'joi';


class CashierChecking {
  static cashierCheck(req, res, next) {
    if (req.userData.type !== 'cashier') {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden: Only cashier is allowed to do this.',
      });
    }

    next();
  }

  static cashierValid(req, res, next) {
    const schema = {
      date: Joi.date().iso().required(),
      amount: Joi.number().min(1000).max(500000).required(),
    };
    const { error } = Joi.validate(req.body, schema);

    if (error) {
      if (error.details[0].message.replace('/', '').replace(/"/g, '').includes('date')) {
        return res.status(400).json({
          status: 400,
          error: {
            error: 'incorrect date format',
            example: 'please use YYYY-MM-DD',
          },
        });
      }
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace('/', '').replace(/"/g, ''),
      });
    }
    next();
  }
}

export default CashierChecking;
