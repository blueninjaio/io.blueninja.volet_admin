/**
|--------------------------------------------------
| Transaction's Model
|--------------------------------------------------
*/

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('transaction', {
    sender_type: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    sender_id: {
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    type: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    receiver_type: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    receiver_id: {
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false
    },
    reason: {
      type: DataTypes.STRING, 
      allowNull: true
    },
  }, {
    tableName: 'transactions'
  })
}