/**
|--------------------------------------------------
| Voucher's Model
|--------------------------------------------------
*/
const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('voucher', {
    code: {
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false
    },
    is_claimed: { 
      type: Sequelize.BOOLEAN, 
      allowNull: false, 
      defaultValue: false 
    },
    claimed_by: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    claimer_id: {
      type: DataTypes.INTEGER, 
      allowNull: true
    },
  }, {
    tableName: 'vouchers'
  })
}