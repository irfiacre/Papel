import models from '../models';

const { user } = models;

class UserQueries {
  static insert(newUser) {
    return user.create(newUser);
  }

  static findByProp(prop) {
    return user.findAll({
      where: prop,
    });
  }
}

export default UserQueries;
