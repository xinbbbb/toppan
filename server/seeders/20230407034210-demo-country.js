'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('country', [
      {
        country_id: 65,
        full_name: "singapore",
        country_code: "SG",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },{
        country_id: 60,
        full_name: "united states",
        country_code: "USA",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },{
        country_id: 1,
        full_name: "united states",
        country_code: "USA",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }]);
  },

  async down (queryInterface, Sequelize) {
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('country', null, {});
    }
  }
};
