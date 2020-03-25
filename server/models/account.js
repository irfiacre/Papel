
export default (sequelize, DataTypes) => {
  const account = sequelize.define('account', {
    accountno: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    createdon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: DataTypes.STRING,
    email: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00,
    },
  }, {
    timestamps: false,
  });
  return account;
};
