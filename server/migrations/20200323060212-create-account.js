
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('accounts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    accountno: {
      type: Sequelize.INTEGER,
      unique: true,
    },
    createdon: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    owner: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'pending',
    },
    balance: {
      type: Sequelize.FLOAT,
      defaultValue: 0.00,
    },
  }, {
    timestamps: false,
  });
}
export function down(queryInterface, Sequelize) {
  return queryInterface.dropTable('accounts');
}
