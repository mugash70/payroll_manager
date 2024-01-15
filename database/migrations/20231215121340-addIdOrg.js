'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('organizations', 'Organization_id', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'non',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('organizations', 'Organization_id');   
  }
};
