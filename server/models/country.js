'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Country.hasMany(models.People, {
        foreignKey: 'country_id',
        onDelete: 'cascade'
      });
    }
  }
  Country.init({
    country_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    country_code: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'country',
    modelName: 'Country',
  });
  Country.removeAttribute('id');
  return Country;
};