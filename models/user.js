'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: 'UserId'
      })
      User.hasMany(models.Like, {
        foreignKey: 'UserId'
      })
      User.hasMany(models.Comment, {
        foreignKey: 'UserId'
      })
    }
  }
  User.init({
    uuid: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Username can't be empty!"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Email can't be empty!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Password can't be empty!"
        }
      }
    },
    fullname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "Fullname can't be empty!"
        }
      }
    },
    avatar: {
      type: DataTypes.STRING,
      validate: {
      }
    },
    status: {
      type: DataTypes.INTEGER,
      validate: {
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};