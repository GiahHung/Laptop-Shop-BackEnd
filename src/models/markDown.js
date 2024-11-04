'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarkDown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  MarkDown.init({
    description: DataTypes.TEXT('long'),
    contentHTML: DataTypes.TEXT('long'),
    contentMarkDown: DataTypes.TEXT('long'),
    productId: DataTypes.STRING,
    policyId: DataTypes.STRING,
    aboutId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'MarkDown',
  });
  return MarkDown;
};