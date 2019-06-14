/**
|--------------------------------------------------
| Log's Controller
|--------------------------------------------------
*/
const {Log} = require('../models')

let _log = {}

_log.createLog = (action, callback) => {
  Log.create({action})
  .then(ok => {
    callback(false)
  })
  .catch(e => {
    callback(true, {message: e})
  })
}

_log.getAll = callback => {
  Log.findAll({order: [[`createdAt`, `DESC`]]})
  .then(logs => {
    if (logs.length > 0) {
      callback(false, logs)
    } else {
      callback(true, {message: `There are no logs`})
    }
  }).catch(e => {
    console.log(`Error in log's getAll: `, e)
    callback(true)
  })
}

module.exports = _log