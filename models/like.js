'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like.belongsTo(models.User, {foreignKey: 'UserId', targetKey: 'uuid'})
      Like.belongsTo(models.Post)
    }
  }
  Like.init({
    strId: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "User ID can't be empty!"
        }
      }
    },
    PostId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "Post ID can't be empty!"
        }
      }
    },
    likeFlag:{
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          message: "Like Flag can't be empty!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};