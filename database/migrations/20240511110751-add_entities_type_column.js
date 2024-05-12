'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'entities',
      'account_no',
     Sequelize.STRING
    );
    await queryInterface.addColumn(
      'entities',
      'account_type',
      Sequelize.STRING
    );
    await queryInterface.addColumn(
      'entities',
      'bank_name',
      Sequelize.STRING
    );
    await queryInterface.addColumn(
      'entities',
      'bank_branch',
      Sequelize.STRING
    );
    // await queryInterface.addColumn(
    //   'entities',
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
