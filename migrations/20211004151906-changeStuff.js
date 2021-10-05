export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("food", 'price', 'unit_price');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("food", 'unit_price', 'price');
    
  }
};
