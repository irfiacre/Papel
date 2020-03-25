
export default (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    createdon: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cashierid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accoutno: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    oldbalance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00,
    },
    newbalance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.00,
    },
  }, {
    timestamps: false,
  });
  return transaction;
};
