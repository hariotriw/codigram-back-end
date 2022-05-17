'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      strId: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'uuid'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      PostId: {
        type: Sequelize.STRING,
        references: {
          model: 'Posts',
          key: 'strId'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      likeFlag: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  }
};