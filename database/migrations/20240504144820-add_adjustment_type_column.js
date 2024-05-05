'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'adjustments',
      'adj_type',
     Sequelize.STRING
    );
    await queryInterface.addColumn(
      'adjustments',
      'amount_type',
      Sequelize.STRING
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('adj_type', 'amount_type');  
  }
};
