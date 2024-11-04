"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AllCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AllCode.hasMany(models.Product, {foreignKey:"brandId", as:"brandData"}),
      AllCode.hasMany(models.Product, {foreignKey:"statusId", as:"statusData"})
    }
  }

  AllCode.init(
    {
      type: DataTypes.STRING,
      keyMap: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AllCode",
    }
  );
  return AllCode;
};
