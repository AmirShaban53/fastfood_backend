

export default {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('user', 'gender', { type: DataTypes.STRING });
  
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('user', 'gender');
  }
};
