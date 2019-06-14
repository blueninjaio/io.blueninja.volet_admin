/**
|--------------------------------------------------
| Admin's Model
|--------------------------------------------------
*/
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('admin', {
    name: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    is_super: { 
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
    tableName: 'admins'
  })
}