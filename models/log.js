/**
|--------------------------------------------------
| Log's Model
|--------------------------------------------------
*/

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('log', {
    action: {
      type: DataTypes.STRING, 
      allowNull: false
    }
  }, {
    tableName: 'logs'
  })
}