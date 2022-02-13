'use strict';

module.exports = {
  async up (queryInterface, Sequelize) { 
    // Jika jalanin command sequelize db:migration, maka function up yang jalan
    await queryInterface.createTable('products', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    // Jika jalanin command sequelize db:rollback, maka function up yang jalan
    await queryInterface.dropTable('products');
  }
};
