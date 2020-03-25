
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      defaultValue: 'client',
    },
    is_admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: false,
  });
}
export function down(queryInterface, Sequelize) { return queryInterface.dropTable('users'); }
