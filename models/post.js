'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
      Post.hasMany(models.Like, {
        foreignKey: 'PostId'
      })
      Post.hasMany(models.Comment, {
        foreignKey: 'PostId'
      })
    }
  }
  Post.init({
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
    caption: {
      type: DataTypes.STRING,
      validate: {
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};