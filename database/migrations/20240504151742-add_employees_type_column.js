'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.addColumn(
    //   'employees',
    //   'address1',
    //  Sequelize.STRING
    // );
    // await queryInterface.addColumn(
    //   'employees',
    //   'address2',
    //   Sequelize.STRING
    // );-
    // await queryInterface.addColumn(
    //   'employees',
    //   'payment',
    //   Sequelize.STRING
    // );
    // await queryInterface.addColumn(
    //   'employees',
    //   'bankaccountno',
    //   Sequelize.STRING
    // );
    // await queryInterface.addColumn(
    //   'employees',
    //   'contracttype',
    //   Sequelize.STRING
    // );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
