/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_groups', {
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      groupId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isEnabled: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('user_groups');
  },
};
