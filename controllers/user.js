/**
|--------------------------------------------------
| User Controllers
|--------------------------------------------------
*/
const jwt                   = require('jsonwebtoken')
const {User, Transaction}   = require('../models/')
const config                = require('../config/config')
const transactionController = require('./transaction')
const logController         = require('./log')
const bcrypt                = require('bcrypt')
const saltRounds            = 9

const transferCredit = (receiver_id, amount, sender_id, transaction_pin, callback) => {
  const sender_type   = `users`,
        receiver_type = `users`,
        type          = `send`
        
  User.findOne({
    where : {
      id : sender_id
    }
  }).then(user => {
    bcrypt.compare(transaction_pin, user.transaction_pin, (err, valid) => {
      if (valid) {
        const credit = parseFloat(user.credit)
        amount       = parseFloat(amount)
    
        if (credit >= amount) {
          // Sufficient balance
          transactionController.addTransaction(receiver_id, amount, sender_id, sender_type, receiver_type, type, (error, reply) => {
            if (!error) {
              logController.createLog(`User ${sender_id} sent ${amount} credits to User ${receiver_id}`, (error, reply) => {
                if (error) {
                  console.log(`Error creating log for transferCredit: `, reply.message)
                }
              })
    
              callback(false)
            } else {
              callback(true, {
                statusCode : reply.statusCode,
                response   : reply.response
              })
            }
          })
        } else {
          callback(true, {
            statusCode : 400,
            response   : {
              success : false,
              message : `Insufficient balance`
            }
          })
        }
      } else {
        callback(true, {
          statusCode : 400,
          response   : {
            success : false,
            message : `Incorrect pin inserted`
          } 
        })
      }
    })
  })
}

module.exports = {
  register             : (req, res) => {
    const email           = req.body.email ? req.body.email : false
    const password        = req.body.password ? bcrypt.hashSync(req.body.password, saltRounds) : false
    const first_name      = req.body.first_name ? req.body.first_name : false
    const last_name       = req.body.last_name ? req.body.last_name : false
    const phone_number    = req.body.phone_number ? req.body.phone_number : false
    const transaction_pin = req.body.transaction_pin ? bcrypt.hashSync(req.body.transaction_pin, saltRounds)  : false
    const facebook_id     = req.body.facebook_id ? req.body.facebook_id : false

    let value = {}
    if (email) value.email                     = email
    if (password) value.password               = password
    if (first_name) value.first_name           = first_name
    if (last_name) value.last_name             = last_name
    if (phone_number) value.phone_number       = phone_number
    if (transaction_pin) value.transaction_pin = transaction_pin
    if (facebook_id) value.facebook_id         = facebook_id

    User.create(value)
    .then(user => {
      return res.status(200).send({
        success : true,
        message : `Successfully registered a user`
      })
    })
    .catch(e => {
      if (e.name == 'SequelizeUniqueConstraintError') {
        return res.status(400).send({
          success : false,
          message : `Email already exist`
        })
      }

      if(e.name == `SequelizeValidationError`) {
        return res.status(400).send({
          success : false,
          message : `Missing required field ${e.errors[0].path}`
        })
      }

      return res.status(400).send({
        success : false,
        message : `Failed to register user`
      })
    })
  },
  login                : (req, res) => {
    const {email, password} = req.body

    // Get the hashed password from the database and compare it with the password sent for login
    const options = {
      where: {
        email  : email,
        active : true
      }
    }

    User.findOne(options)
    .then(user => {
      if (user) {
        // Compare hashed password with the given password
        bcrypt.compare(password, user.password, (err, valid) => {
          if (valid) {
            // Generate token
            const payload = {
              id      : user.id,
              name    : user.name,
              email   : user.email,
              is_user : true
            }
            const token = jwt.sign(payload, config.private_key, {expiresIn: config.token_expires_in})
  
            // Craft response
            const response = {
              success   : true,
              message   : 'Login successful',
              token     : token,
              expiresIn : config.token_expires_in
            }
        
            return res.status(200).send(response)
          } else {
            // Given password does not match
            const response = {
              success : false,
              message : 'Invalid credentials'
            }
        
            return res.status(403).send(response)
          }
        })
      } else {
        return res.status(404).send({
          success : false,
          message : `Invalid credentials`
        })
      }
    })
  },
  updateProfile        : (req, res) => {
    const first_name      = req.body.first_name ? req.body.first_name : false
    const last_name       = req.body.last_name ? req.body.last_name : false
    const transaction_pin = req.body.transaction_pin ? bcrypt.hashSync(req.body.transaction_pin, saltRounds)  : false

    let value = {}
    if (first_name) value.first_name           = first_name
    if (last_name) value.last_name             = last_name
    if (transaction_pin) value.transaction_pin = transaction_pin

    User.update(value, {
      where : {
        id : req.decoded.id
      }
    }).then(user => {
      return res.status(200).send({
        success : true,
        message : `Successfully updated user's profile`
      })
    }).catch(e => {
      console.log(`Error at user's updateProfile: `, e)
      return res.status(500).send({
        success : false,
        message : `Internal server error`
      })
    })
  },
  changePassword       : (req, res) => {
    const old_password = req.body.old_password && typeof(req.body.old_password) == 'string' ? req.body.old_password : false
    const new_password = req.body.new_password && typeof(req.body.new_password) == 'string' ? bcrypt.hashSync(req.body.new_password, saltRounds) : false

    if (old_password && new_password) {
      console.log(`Step 1`)
      User.findOne({
        where : {
          id : req.decoded.id
        }
      }).then(user => {
        console.log(`Step 2`)
        bcrypt.compare(old_password, user.password, (err, valid) => {
          console.log(`Step 3: err is ${err} AND valid is ${valid}`)
          if (valid) {
            User.update({
              password : new_password
            },
            {
              where    : {
                id : req.decoded.id
              }
            }).then(user => {
              return res.status(200).send({
                success : true,
                message : `Successfully updated new password`
              })
            }).catch(e => {
              console.log(`Error at user's changePassword: `, e)
  
              return res.status(500).send({
                success : false,
                message : `Internal server error`
              })
            })
          } else {
            return res.status(400).send({
              success : false,
              message : `Invalid old password`
            })
          }
        })
      }).catch(e => {
        return res.status(404).send({
          success : false,
          message : `User not found`
        })
      })
    } else {
      return res.status(400).send({
        success : false,
        message : `Missing required fields`
      })
    }
  },
  addPushToken         : (req, res) => {
    const push_token = req.body.push_token ? req.body.push_token : false
    const id         = req.params.id ? req.params.id : false

    if (!id) {
      return res.status(400).send({
        success : false,
        message : `No id is given for update`
      })
    }

    if (push_token) {
      User.update({push_token: push_token}, {where: {id: id}})
        .then(() => {
          return res.status(200).send({
            success : true,
            message : `Successfully added the push token`
          })
        })
        .catch(e => {
          console.log(`Error user's addPushToken: `, e)
          return res.status(500).send({
            success : false,
            message : `Internal server error`
          })
        })
    } else {
      return res.status(400).send({
        success : false,
        message : `Missing required field push_token`
      })
    }
  },
  aboutme              : (req, res) => {
    User.findOne({where: {
      id: req.decoded.id
    }}).then(user => {
      return res.status(200).send({
        success : true,
        message : `Successfully fetched user's data`,
        data    : {
          id              : user.id,
          first_name      : user.first_name,
          last_name       : user.last_name,
          email           : user.email,
          phone_number    : user.phone_number,
          credit          : user.credit,
          transaction_pin : user.transaction_pin,
          facebook_id     : user.facebook_id
        }
      })
    })
  },
  about                : (req, res) => {
    User.findOne({
      where : {
        id     : req.params.id,
        active : true
      }
    }).then(user => {
      if (user) {
        return res.status(200).send({
          success : true,
          message : `Successfully fetched user's data`,
          data    : {
            id              : user.id,
            first_name      : user.first_name,
            last_name       : user.last_name,
            email           : user.email,
            phone_number    : user.phone_number,
            facebook_id     : user.facebook_id
          }
        })
      } else {
        return res.status(404).send({
          success : false,
          message : `User not found`
        })
      }
    })
  },
  sendCredit           : (req, res) => {
    const {
          receiver_id, 
          amount,
          transaction_pin
    }                     = req.body
    const sender_id       = req.decoded.id

    transferCredit(receiver_id, amount, sender_id, transaction_pin, (error, reply) => {
      if (!error) {
        return res.status(200).send({
          success : true,
          message : `Succesfully sent credit to user`
        })
      } else {
        return res.status(reply.statusCode).send(reply.response)
      }
    })
  },
  getCreditRequest     : (req, res) => {
    Transaction.findAll({
      where : {
        type          : `request`,
        receiver_type : `users`,
        receiver_id   : req.decoded.id
      }
    })
    .then(transactions => {
      if (transactions.length > 0){
        return res.status(200).send({
          success : true,
          message : `Successfully fetched credit requests`,
          data    : transactions
        })
      } else {
        return res.status(404).send({
          success : false,
          message : `There are no pending requests`
        })
      }
    })
    .catch(e => {
      console.log(`Error getCreditRequest in controllers/user.js: `, e)
      return res.status(500).send({
        success : false,
        message : `Internal server error`
      })
    })
  },
  requestCredit        : (req, res) => {
    const user_id = req.body.user_id ? req.body.user_id : false
    const amount  = req.body.amount && typeof(req.body.amount) === 'number' && req.body.amount >= 1 ? req.body.amount : false
    const reason  = req.body.reason ? req.body.reason : null

    const values  = {
      sender_type   : `users`,
      sender_id     : req.decoded.id,
      type          : `request`,
      receiver_type : `users`,
      receiver_id   : user_id,
      amount        : amount,
      reason        : reason
    }

    Transaction.create(values)
    .then(transaction => {
      return res.status(200).send({
        success : true,
        message : `Successfully sent credit request`
      })
    }).catch(e => {
      console.log(`Error creating transaction in requestCredit: `, e)
      return res.status(500).send({
        success : false,
        message : `Failed to send credit request`
      })
    })
  },
  approveCreditRequest : (req, res) => {
    const request_id        = req.params.id
    const {transaction_pin} = req.body

    Transaction.findOne({
      where : {
        id            : request_id,
        type          : `request`,
        receiver_type : `users`,
        receiver_id   : req.decoded.id
      }
    }).then(request => {
      if (request && request.receiver_type == `users` && request.receiver_id == req.decoded.id) {
        // Send credit to requester
        const receiver_id = request.sender_id,
              amount      = request.amount,
              sender_id   = req.decoded.id

        transferCredit(receiver_id, amount, sender_id, transaction_pin, (error, reply) => {
          if (!error) {
            // Delete the request
            Transaction.destroy({where: {id: request_id}})
            .then(() => {
              return res.status(200).send({
                success : true,
                message : `Succesfully sent credit to user`
              })
            }).catch(e => {
              console.log(`Error deleting request at approveCreditRequest: `, e)
              return res.status(500).send({
                success : false,
                message : `Internal server error`
              })
            })
          } else {
            return res.status(reply.statusCode).send(reply.response)
          }
        })
      } else {
        return res.status(404).send({
          success : false,
          message : `Request not found`
        })
      }
    })
  },
  declineCreditRequest : (req, res) => {
    const request_id = req.params.id

    Transaction.findOne({
      where : {
        id            : request_id,
        type          : `request`,
        receiver_type : `users`,
        receiver_id   : req.decoded.id
      }
    }).then(request => {
      if (request) {
        // Delete the request
        Transaction.destroy({where: {id: request_id}})
        .then(() => {
          return res.status(200).send({
            success : true,
            message : `Succesfully deleted credit request`
          })
        }).catch(e => {
          console.log(`Error deleting request at declineCreditRequest: `, e)
          return res.status(500).send({
            success : false,
            message : `Internal server error`
          })
        })
      } else {
        return res.status(404).send({
          success : false,
          message : `Request not found`
        })
      }
    })
  }
}