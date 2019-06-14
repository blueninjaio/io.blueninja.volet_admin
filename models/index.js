/**
|--------------------------------------------------
| Models Index
|--------------------------------------------------
*/
const sequelize = require('../database/database')

sequelize.sync()

// Models
module.exports = {
    Admin       : sequelize.import("admin"),
    Log         : sequelize.import("log"),
    Merchant    : sequelize.import("merchant"),
    Push        : sequelize.import("push"),
    Transaction : sequelize.import("transaction"),
    User        : sequelize.import("user"),
    Voucher     : sequelize.import("voucher"),
}
