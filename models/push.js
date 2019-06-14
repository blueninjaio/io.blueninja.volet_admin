/**
|--------------------------------------------------
| Push's Model
|--------------------------------------------------
*/

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('push', {
    title: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    body: {
      type: DataTypes.STRING, 
      allowNull: false
    },
  }, {
    tableName: 'pushs'
  })
}