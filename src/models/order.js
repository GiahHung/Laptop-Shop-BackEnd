'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Order.init({
    userId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    statusId: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER,
    note: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};