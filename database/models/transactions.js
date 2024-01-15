'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transactions.init({
    trans_id: DataTypes.INTEGER,
    emp_name: DataTypes.STRING,
    amount: DataTypes.STRING,
    adjustments: DataTypes.JSON,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};