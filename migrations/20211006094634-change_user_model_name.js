export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameTable('user','customer');
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.renameTable('customer','user');

  }
};
