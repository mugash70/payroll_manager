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
    await queryInterface.addColumn(
      'employees',
      'address1',
      Sequelize.STRING
    );
    await queryInterface.addColumn(
      'employees',
      'address2',
      Sequelize.STRING
    );
    await queryInterface.addColumn(
      'organizations',
      'created_by',
      Sequelize.STRING
    );
    await queryInterface.addColumn(
      'organizations',
      'ent_no',
      Sequelize.BIGINT
    );
    await queryInterface.addColumn(
      'entities',
      'org_id',
      Sequelize.STRING
    );
  
    await queryInterface.addColumn(
      'users',
      'org_id',
      Sequelize.STRING
    );
    await queryInterface.addColumn(
      'users',
      'ent_id',
      Sequelize.STRING
    );
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.removeColumn('adj_type', 'amount_type');  
  }
};
