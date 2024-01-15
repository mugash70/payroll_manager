'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
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
      ID: {
        type: Sequelize.STRING
      },
      pic_link: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      nhif: {
        type: Sequelize.STRING
      },
      nssf: {
        type: Sequelize.STRING
      },
      payment: {
        type: Sequelize.STRING
      },
      contract: {
        type: Sequelize.STRING
      },
      pin: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      period_from: {
        type: Sequelize.DATE
      },
      period_to: {
        type: Sequelize.DATE
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
      salary: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('employees');
  }
};