/**
|--------------------------------------------------
| User's Model
|--------------------------------------------------
*/
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
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
    credit: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
      defaultValue: 0.00
    },
    transaction_pin: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    facebook_id: {
      type: DataTypes.INTEGER, 
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
    is_agent: { 
      type: Sequelize.BOOLEAN, 
      allowNull: false, 
      defaultValue: false 
    },
    active: { 
      type: Sequelize.BOOLEAN, 
      allowNull: false, 
      defaultValue: true 
    }
  }, {
    tableName: 'users'
  })
}