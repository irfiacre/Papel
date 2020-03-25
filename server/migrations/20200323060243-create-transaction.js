
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    createdon: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cashierid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    accoutno: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    oldbalance: {
      type: Sequelize.FLOAT,
      defaultValue: 0.00,
    },
    newbalance: {
      type: Sequelize.FLOAT,
      defaultValue: 0.00,
    },
  }, {
    timestamps: false,
  });
}
export function down(queryInterface, Sequelize) {
  return queryInterface.dropTable('transactions');
}
