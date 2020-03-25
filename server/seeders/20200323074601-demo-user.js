
export function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('users', [{
    email: 'admin@mail.com',
    firstname: 'RASTA',
    lastname: 'Admin',
    password: '$2b$10$K4EmRPE/zh/b6QxPQiVVaOtnq01okywVrxsJMFr8kL9L2qg24c5gS',
    type: 'staff',
    is_admin: true,
  }, {
    email: 'cashier@mail.com',
    firstname: 'RASTA',
    lastname: 'Cashier',
    password: '$2b$10$K4EmRPE/zh/b6QxPQiVVaOtnq01okywVrxsJMFr8kL9L2qg24c5gS',
    type: 'cashier',
    is_admin: false,
  }, {
    email: 'firaduk@gmail.com',
    firstname: 'NGABO',
    lastname: 'Joseph',
    password: '$2b$10$K4EmRPE/zh/b6QxPQiVVaOtnq01okywVrxsJMFr8kL9L2qg24c5gS',
    type: 'client',
    is_admin: false,
  }]);
}
export function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('users', null, {});
}
