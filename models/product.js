'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Order)
      Product.belongsToMany(models.User, { through: models.Order })
    }
  }
  Product.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title products cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Price cannot be empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Stock cannot be empty'
        }
      }
    },
    releaseYear: {
      type: DataTypes.DATE,
      get() {
        const rawValue = this.getDataValue('releaseYear');
        return rawValue ? rawValue.getFullYear() : null
      },
      validate: {
        notEmpty: {
          msg: 'Release Year cannot be empty'
        }
      }
    }
    ,
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Genre cannot be empty'
        }
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Image Url cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};