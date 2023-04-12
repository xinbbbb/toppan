'use strict';
const {
  Model
} = require('sequelize');
const { Author, Book}  = require('./index')

module.exports = (sequelize, DataTypes) => {
  class Author_book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Author_book.belongsTo(models.Book, {
        foreignKey: 'book_id',
        sourceKey: models.Book.id,
        onDelete: 'CASCADE'
      });

      models.Author_book.belongsTo(models.Author, {
        foreignKey: 'author_id',
        sourceKey: models.Author.id,
        onDelete: 'CASCADE'
      });
    }
  }
  Author_book.init({
    author_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'author_books',
    modelName: 'Author_book',
  });
  Author_book.removeAttribute('id');
  return Author_book;
};