"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "subType", {
      type: Sequelize.ENUM("Monthly", "PayG"),
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn("Users", "subStartDate", {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn("Users", "subEndDate", {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn("Users", "units", {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'units');
    await queryInterface.removeColumn('Users', 'subEndDate');
    await queryInterface.removeColumn('Users', 'subStartDate');
    await queryInterface.removeColumn('Users', 'subType');
  },
};
