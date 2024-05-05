'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class adjustments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  adjustments.init({
    adj_id: DataTypes.INTEGER,
    adj_name: DataTypes.STRING,
    adj_type: DataTypes.STRING,
    amount: DataTypes.STRING,
    from: DataTypes.DATE,
    to: DataTypes.DATE,
    period: DataTypes.DATE,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'adjustments',
  });
  return adjustments;
};