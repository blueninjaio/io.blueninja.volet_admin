/**
|--------------------------------------------------
| Admin's Controllers
|--------------------------------------------------
*/
const {
      Admin, 
      Merchant, 
      Transaction, 
      User
}                             = require('../models')
const jwt                     = require('jsonwebtoken')
const transactionController   = require('./transaction')
const logController           = require('./log')
const config                  = require('../config/config')
const bcrypt                  = require('bcrypt')
const saltRounds              = 9

module.exports = {
  register            : (req, res) => {
    // Check if there is already a super admin registered
    Admin.count()
    .then(count => {
      if (count !== 0) {
        // Do not allow admin registration
        return res.status(403).send({
          success : false,
          message : `Admin registration is not allowed`
        })
      }

      const email    = req.body.email ? req.body.email : false
      const password = req.body.password ? bcrypt.hashSync(req.body.password, saltRounds) : false
      const name     = req.body.name ? req.body.name : false
      const is_super = true
  
      let value = {}
      if (email) value.email       = email
      if (password) value.password = password
      if (name) value.name         = name
      if (is_super) value.is_super = is_super
  
      Admin.create(value)
      .then(admin => {
        return res.status(200).send({
          success : true,
          message : `Successfully registered an admin`
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

        console.log(`Admin registration error: `, e)

        return res.status(400).send({
          success : false,
          message : `Failed to register admin`
        })
      })
    })
  },
  login               : (req, res) => {
    const {email, password} = req.body

    // Get the hashed password from the database and compare it with the password sent for login
    const options = {
      where : {
        email  : email,
        active : true
      }
    }

    Admin.findOne(options)
    .then(admin => {
      // Compare hashed password with the given password
      bcrypt.compare(password, admin.password, (err, valid) => {
        if (valid) {
          // Generate token
          const payload = {
            id       : admin.id,
            name     : admin.name,
            email    : admin.email,
            is_admin : true,
            is_super : admin.is_super
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
    })
  },
  addAdmin            : (req, res) => {
    const email    = req.body.email ? req.body.email : false
    const password = req.body.password ? bcrypt.hashSync(req.body.password, saltRounds) : false
    const name     = req.body.name ? req.body.name : false

    let value = {}
    if (email) value.email       = email
    if (password) value.password = password
    if (name) value.name         = name

    Admin.create(value)
    .then(admin => {
      return res.status(200).send({
        success : true,
        message : `Successfully registered an admin`
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

      console.log(`Admin registration error: `, e)

      return res.status(400).send({
        success : false,
        message : `Failed to register admin`
      })
    })
  },
  getAdminList        : (req, res) => {
    Admin.findAll({
      where : {
        is_super : false
      }
    })
    .then(adminsRawData => {
      // Remove passwords from response
      var admins = []
      adminsRawData.forEach(admin => {
        admins.push({
          id        : admin.id,
          name      : admin.name,
          email     : admin.email,
          createdAt : admin.createdAt,
          updatedAt : admin.updatedAt
        })
      })

      const response = {
        success : true,
        message : `Succesfully fetched all admins`,
        data    : admins
      }
      return res.status(200).send(response)
    })
  },
  archiveAdmin        : (req, res) => {
    Admin.update({
      active: false
    },
    {
      where : {
        id : req.params.id
      } 
    })
    .then(() => {
      const response = {
        success : true,
        message : `Archived admin succesfully`
      }
  
      return res.status(200).send(response)
    })
    .catch(e => {
      console.log(`Error archiveAdmin: `, e)
    })
  },
  getUserList         : (req, res) => {
    User.findAll()
    .then(usersRawData => {
      // Remove passwords from response
      var users = []
      usersRawData.forEach(user => {
        users.push({
          id           : user.id,
          first_name   : user.first_name,
          last_name    : user.last_name,
          email        : user.email,
          phone_number : user.phone_number,
          credit       : user.credit,
          facebook_id  : user.facebook_id,
          push_token   : user.push_token,
          is_agent     : user.is_agent? `Yes` : `No`,
          active       : user.active? `Yes` : `No`,
          createdAt    : user.createdAt,
          updatedAt    : user.updatedAt
        })
      })

      const response = {
        success : true,
        message : `Succesfully fetched all users`,
        data    : users
      }
      return res.status(200).send(response)
    })
  },
  viewUserById        : (req, res) => {
    User.findOne({
      where : {
        id : req.params.id
      }
    }).then(user => {
      if (user) {
        return res.status(200).send({
          success : true,
          message : `Successfully fetch the user's data`,
          data    : user
        })
      } else {
        return res.status(404).send({
          success : false,
          message : `User not found`
        })
      }
    })
  },
  getMerchantList     : (req, res) => {
    Merchant.findAll()
    .then(merchantsRawData => {
      // Remove passwords from response
      var merchants = []
      merchantsRawData.forEach(merchant => {
        merchants.push({
          id           : merchant.id,
          first_name   : merchant.first_name,
          last_name    : merchant.last_name,
          email        : merchant.email,
          phone_number : merchant.phone_number,
          push_token   : merchant.push_token,
          active       : merchant.active? `Yes` : `No`,
          createdAt    : merchant.createdAt,
          updatedAt    : merchant.updatedAt
        })
      })

      const response = {
        success : true,
        message : `Succesfully fetched all merchants`,
        data    : merchants
      }
      return res.status(200).send(response)
    })
  },
  viewMerchantById    : (req, res) => {
    Merchant.findOne({
      where : {
        id : req.params.id
      }
    }).then(merchant => {
      if (merchant) {
        return res.status(200).send({
          success : true,
          message : `Successfully fetch the merchant's data`,
          data    : merchant
        })
      } else {
        return res.status(404).send({
          success : false,
          message : `Merchant not found`
        })
      }
    })
  },
  archiveUser         : (req, res) => {
    User.update({
      active : false
    }, 
    {
      where  : {
        id : req.params.id
      } 
    })
    .then(() => {
      const response = {
        success : true,
        message : `Archived user succesfully`
      }
  
      return res.status(200).send(response)
    })
    .catch(e => {
      console.log(`Error archiveUser: `, e)
    })
  },
  archiveMerchant     : (req, res) => {

    Merchant.update({
      active : false
    }, 
    {
      where : {
        id : req.params.id
      } 
    })
    .then(() => {
      const response = {
        success : true,
        message : `Archived merchant succesfully`
      }
  
      return res.status(200).send(response)
    })
    .catch(e => {
      console.log(`Error archiveMerchant: `, e)
    })
  },
  addCreditToUser     : (req, res) => {
    const sender_type   = `admins`,
          receiver_type = `users`,
          type          = `admin add`,
          receiver_id   = req.params.id,
          amount        = req.body.amount,
          sender_id     = req.decoded.id

    transactionController.addTransaction(receiver_id, amount, sender_id, sender_type, receiver_type, type, (error, reply) => {
      if (!error) {
        logController.createLog(`Admin ${sender_id} allocated ${amount} credits to User ${receiver_id}`, (error, reply) => {
          if (error) {
            console.log(`Error creating log for addCreditToUser: `, reply.message)
          }
        })

        return res.status(200).send({
          success : true,
          message : `Succesfully added credit to user`
        })
      }

      return res.status(reply.statusCode).send(reply.response)
    })
  },
  removeUserCredit    : (req, res) => {
    const sender_type   = `admins`,
          receiver_type = `users`,
          type          = `admin add`,
          receiver_id   = req.params.id,
          amount        = req.body.amount,
          sender_id     = req.decoded.id

    transactionController.addTransaction(receiver_id, amount, sender_id, sender_type, receiver_type, type, (error, reply) => {
      if (!error) {
        logController.createLog(`Admin ${sender_id} removed ${amount} credits from User ${receiver_id}`, (error, reply) => {
          if (error) {
            console.log(`Error creating log for removeCreditToUser: `, reply.message)
          }
        })

        return res.status(200).send({
          success : true,
          message : `Succesfully removed credit from user`
        })
      }

      return res.status(reply.statusCode).send(reply.response)
    })
  },
  viewTransactions    : (req, res) => {
    Transaction.findAll()
    .then(transactions => {
      if (transactions.length > 0) {
        return res.status(200).send({
          success : true,
          message : `Successfully fetched all transactions`,
          data    : transactions
        })
      } else {
        return res.status(404).send({
          success : false,
          message : `There are no transactions`
        })
      }
    })
  },
  viewTransactionById : (req, res) => {
    Transaction.findOne({
      where : {
        id : req.params.id
      }
    }).then(transaction => {
      if (transaction) {
        return res.status(200).send({
          success : true,
          message : `Successfully fetch the transaction's data`,
          data    : transaction
        })
      } else {
        return res.status(404).send({
          success : false,
          message : `Transaction not found`
        })
      }
    })
  },
  viewLogs            : (req, res) => {
    logController.getAll((error, reply) => {
      if (!error) {
        return res.status(200).send({
          success : true,
          message : `Succesfully fetched all logs`,
          data    : reply
        })
      } else {
        return res.status(500).send({
          success : false,
          message : `Internal server error`
        })
      }
    })
  }
}