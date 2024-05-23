'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async findAllWithUser() {
      return this.findAll({
        include: [{ model: this.sequelize.models.User }]
      });
    }

    static associate(models) {
      // define association here
      Order.belongsTo(models.Product)
      Order.belongsTo(models.User)
    }
  }
  Order.init({
    amount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};