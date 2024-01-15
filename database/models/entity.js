'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Entity.init({
    ent_id: DataTypes.INTEGER,
    ent_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    payment: DataTypes.STRING,
    org_id: DataTypes.INTEGER,
    payment_period: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Entity',
  });
  return Entity;
};