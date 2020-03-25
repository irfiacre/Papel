
export function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('accounts', [{
    accountno: 201231,
    createdon: 2012-12-27,
    owner: 'RASTA Never',
    email: 'fia@mail.com',
    type: 'current',
    status: 'active',
  }, {
    accountno: 200231,
    createdon: 2012-12-27,
    owner: 'RASTA Never',
    email: 'fia@mail.com',
    type: 'current',
    status: 'active',
  }, {
    accountno: 201201,
    createdon: 2012-12-27,
    owner: 'RASTA Never',
    email: 'fiaK@mail.com',
    type: 'current',
    status: 'dormant',
  }, {
    accountno: 201901,
    createdon: 2012-11-20,
    owner: 'RASTA Never',
    email: 'fiaK@mail.com',
    type: 'current',
    status: 'pending',
  }, {
    accountno: 201225,
    createdon: 2012-12-27,
    owner: 'kagabo divin',
    email: 'kag@mail.com',
    type: 'savings',
    status: 'pending',
    balance: 1000000,
  }]);
}
export function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('accounts', null, {});
}
