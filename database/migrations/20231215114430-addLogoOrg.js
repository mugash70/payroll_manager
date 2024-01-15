'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('organizations', 'logo', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'non',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('organizations', 'logo');   
  }
};
