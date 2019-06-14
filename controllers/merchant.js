/**
|--------------------------------------------------
| Merchant's Controllers
|--------------------------------------------------
*/
const jwt        = require('jsonwebtoken')
const {Merchant} = require('../models/')
const config     = require('../config/config')
const bcrypt     = require('bcrypt')
const saltRounds = 9

module.exports = {
  register     : (req, res) => {
    const email           = req.body.email ? req.body.email : false
    const password        = req.body.password ? bcrypt.hashSync(req.body.password, saltRounds) : false
    const first_name      = req.body.first_name ? req.body.first_name : false
    const last_name       = req.body.last_name ? req.body.last_name : false
    const phone_number    = req.body.phone_number ? req.body.phone_number : false
    const transaction_pin = req.body.transaction_pin ? bcrypt.hashSync(req.body.transaction_pin, saltRounds) : false

    let value = {}
    if (email) value.email                     = email
    if (password) value.password               = password
    if (first_name) value.first_name           = first_name
    if (last_name) value.last_name             = last_name
    if (phone_number) value.phone_number       = phone_number
    if (transaction_pin) value.transaction_pin = transaction_pin

    Merchant.create(value)
    .then(merchant => {
      return res.status(200).send({
        success : true,
        message : `Successfully registered a merchant`
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
        message : `Failed to register merchant`
      })
    })
  },
  login        : (req, res) => {
    const {email, password} = req.body

    // Get the hashed password from the database and compare it with the password sent for login
    const options = {
      where : {
        email  : email,
        active : true
      }
    }

    Merchant.findOne(options)
    .then(merchant => {
      if (merchant) {
        // Compare hashed password with the given password
        bcrypt.compare(password, merchant.password, (err, valid) => {
          if (valid) {
            // Generate token
            const payload = {
              id          : merchant.id,
              name        : merchant.name,
              email       : merchant.email,
              is_merchant : true
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
  changePassword       : (req, res) => {
    const old_password = req.body.old_password && typeof(req.body.old_password) == 'string' ? req.body.old_password : false
    const new_password = req.body.new_password && typeof(req.body.new_password) == 'string' ? bcrypt.hashSync(req.body.new_password, saltRounds) : false

    if (old_password && new_password) {
      console.log(`Step 1`)
      Merchant.findOne({
        where : {
          id : req.decoded.id
        }
      }).then(merchant => {
        console.log(`Step 2`)
        bcrypt.compare(old_password, merchant.password, (err, valid) => {
          console.log(`Step 3: err is ${err} AND valid is ${valid}`)
          if (valid) {
            Merchant.update({
              password : new_password
            },
            {
              where    : {
                id : req.decoded.id
              }
            }).then(merchant => {
              return res.status(200).send({
                success : true,
                message : `Successfully updated new password`
              })
            }).catch(e => {
              console.log(`Error at merchant's changePassword: `, e)
  
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
          message : `Merchant not found`
        })
      })
    } else {
      return res.status(400).send({
        success : false,
        message : `Missing required fields`
      })
    }
  },
  addPushToken : (req, res) => {
    const push_token = req.body.push_token ? req.body.push_token : false
    const id         = req.params.id ? req.params.id : false

    if (!id) {
      return res.status(400).send({
        success : false,
        message : `No id is given for update`
      })
    }

    if (push_token) {
      Merchant.update({push_token: push_token}, {where: {id: id}})
        .then(() => {
          return res.status(200).send({
            success : true,
            message : `Successfully added the push token`
          })
        })
        .catch(e => {
          console.log(`Error merchant's addPushToken: `, e)
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
  aboutme      : (req, res) => {
    Merchant.findOne({
      where: {
        id: req.decoded.id
      }
    }).then(merchant => {
      return res.status(200).send({
        success : true,
        message : `Successfully fetched merchant's data`,
        data    : {
          id              : merchant.id,
          first_name      : merchant.first_name,
          last_name       : merchant.last_name,
          email           : merchant.email,
          phone_number    : merchant.phone_number,
          transaction_pin : merchant.transaction_pin
        }
      })
    })
  }
}