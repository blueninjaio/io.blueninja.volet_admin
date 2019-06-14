/**
|--------------------------------------------------
| Merchant's Model
|--------------------------------------------------
*/
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('merchant', {
    first_name: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: true, 
      unique: true
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    transaction_pin: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    profile_image: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    push_token: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    active: { 
      type: Sequelize.BOOLEAN, 
      allowNull: false, 
      defaultValue: true 
    }
  }, {
    tableName: 'merchants'
  })
}