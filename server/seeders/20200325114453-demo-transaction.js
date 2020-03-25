
export function up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('transactions', [{
    createdon: 2020-10-10,
    type: 'credit',
    cashierid: 2,
    accoutno: 201225,
    amount: 2000,
    oldbalance: 1000000,
    newbalance: 1002000,
  }]);
}
export function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('transactions', null, {});
}
