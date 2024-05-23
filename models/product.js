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
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    releaseYear: DataTypes.DATE,
    genre: DataTypes.STRING,
    imageURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};