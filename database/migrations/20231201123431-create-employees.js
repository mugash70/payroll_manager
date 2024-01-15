'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      emp_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      pay_id: {
        type: Sequelize.INTEGER
      },
      grade_id: {
        type: Sequelize.INTEGER
      },
      account_no: {
        type: Sequelize.STRING
      },
      dept_id: {
        type: Sequelize.INTEGER
      },
      ent_id: {
        type: Sequelize.INTEGER
      },
      account_type: {
        type: Sequelize.STRING
      },
      bank_name: {
        type: Sequelize.STRING
      },
      bank_branch: {
        type: Sequelize.STRING
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employees');
  }
};