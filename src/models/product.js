"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.AllCode, {
        foreignKey: "brandId",
        targetKey: "keyMap",
        as: "brandData",
      }),
        Product.belongsTo(models.AllCode, {
          foreignKey: "statusId",
          targetKey: "keyMap",
          as: "statusData",
        }),
        Product.hasMany(models.Cart, { foreignKey: "productId" }),
        Product.hasMany(models.Transaction, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      hotId: DataTypes.STRING,
      price: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
      image: DataTypes.BLOB("long"),
      categoryId: DataTypes.STRING,
      brandId: DataTypes.STRING,
      statusId: DataTypes.STRING,
      mouseCategory: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
