import models from '../models';

const { transaction } = models;

class TransactionQueries {
  static insert(newtransaction) {
    return transaction.create(newtransaction);
  }

  static findByProp(prop) {
    return transaction.findAll({
      where: prop,
    });
  }
}

export default TransactionQueries;
