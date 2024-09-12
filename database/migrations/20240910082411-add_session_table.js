'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('session', 
      {   
        sid: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING // Use STRING to match VARCHAR in PostgreSQL
        },
        sess: {
          type: Sequelize.JSON,   // No change, still using JSON to store session data
          allowNull: false        // Ensures session data is required
        },
        expire: {
          type: Sequelize.DATE,   // No change, stores expiration as a timestamp
          allowNull: false        // Expiration is required
        }
    
    }
    
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('session');
  }
};
