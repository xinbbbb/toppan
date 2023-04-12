'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book_rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book_rent.init({
    person_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    book_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'book_rents',
    modelName: 'Book_rent',
  });
  Book_rent.removeAttribute('id');
  return Book_rent;
};