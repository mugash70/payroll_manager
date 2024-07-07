'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'adjustments',
      'ent_id',
     Sequelize.STRING
    );
    await queryInterface.addColumn(
      'grades',
      'ent_id',
      Sequelize.STRING
    );
    await queryInterface.addColumn(
      'payments',
      'ent_id',
      Sequelize.STRING
    );
    await queryInterface.addColumn(
      'transactions',
      'ent_id',
      Sequelize.STRING
    );
    await queryInterface.addColumn(
      'departments',
      'ent_id',
      Sequelize.STRING
    );
    await queryInterface.addColumn(
      'frequency',
      'ent_id',
      Sequelize.STRING
    );
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.removeColumn('adj_type', 'amount_type');  
  }
};
