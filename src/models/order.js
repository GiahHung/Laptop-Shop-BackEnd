"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.AllCode, {
        foreignKey: "paymentId",
        targetKey: "keyMap",
        as: "paymentData",
      }),
        Order.belongsTo(models.AllCode, {
          foreignKey: "statusId",
          targetKey: "keyMap",
          as: "statusDt",
        }),
        Order.hasMany(models.Transaction, { foreignKey: "orderId" });
    }
  }

  Order.init(
    {
      userId: DataTypes.INTEGER,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      statusId: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER,
      note: DataTypes.STRING,
      paymentId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
