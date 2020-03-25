import models from '../models';

const { account } = models;

class AccountQueries {
  static insert(newaccount) {
    return account.create(newaccount);
  }

  static findALL() {
    return account.findAll();
  }

  static findByProp(prop) {
    return account.findAll({
      where: prop,
    });
  }

  static deleteAtt(prop) {
    return account.destroy({
      where: prop,
    });
  }

  static updateAtt(set, prop) {
    return account.update(set, {
      where: prop,
    });
  }
}

export default AccountQueries;
