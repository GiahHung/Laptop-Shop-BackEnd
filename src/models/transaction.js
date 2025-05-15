"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Order, { foreignKey: "orderId" });
      Transaction.belongsTo(models.Product, { foreignKey: "productId" });
      
    }
  }
  Transaction.init(
    {
      orderId: DataTypes.STRING,
      productId: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
