'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {foreignKey: 'UserId', targetKey: 'uuid'})
      // Comment.belongsTo(models.Post, {foreignKey: 'PostId', targetKey: 'strId'})
    }
  }
  Comment.init({
    strId: {
      type: DataTypes.STRING,
      validate: {
      }
    },
    UserId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "User ID can't be empty!"
        }
      }
    },
    PostId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Post ID can't be empty!"
        }
      }
    },
    comment: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Comment can't be empty!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};