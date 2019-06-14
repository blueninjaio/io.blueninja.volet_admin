/**
|--------------------------------------------------
| Transaction's Controllers
|--------------------------------------------------
*/
const {Transaction, User} = require(`../models/`)
let _transaction          = {}

_transaction.updateCredit = (user_type, user_id, callback) => {
  // Find total amount spent by sender
  Transaction.findAll({
    where: {
      sender_type : user_type,
      sender_id   : user_id
    }
  }).then(transactions => {
    var credit = 0.00

    transactions.forEach(transaction => {
      let {type, amount} = transaction
      amount             = parseFloat(amount)

      if (type == `send` || type == `pay` || type == `admin remove`){
        credit -= amount
      }
    })

    // Find total amount received by sender
    Transaction.findAll({
      where: {
        receiver_type : user_type,
        receiver_id   : user_id
      }
    }).then(transactions => {
      transactions.forEach(transaction => {
        let {type, amount} = transaction
        amount             = parseFloat(amount)

        if (type == `send` || type == `admin add` || type == `voucher topup`) {
          credit += amount
        } 
      })
      
      if (user_type == `users`) {
        User.update({
          credit : credit
        }, 
        {
          where  : {
            id : user_id
          }
        }).then(user => {
          callback(false)
        }).catch(e => {
          callback(true, {message: e})
        })
      } else if (user_type == `admins` || user_type == `vouchers`){
        callback(false)
      }
    })

  })
}

_transaction.updateAffectedAccounts = (sender_type, sender_id, receiver_type, receiver_id, callback) => {
  // Update sender's credit
  _transaction.updateCredit(sender_type, sender_id, (error, reply) => {
    if (!error) {
      // Update receiver's credit
      _transaction.updateCredit(receiver_type, receiver_id, (error, reply) => {
        if (!error) {
          callback(false)
        } else {
          callback(true, reply)
        }
      })
    } else {
      callback(true, reply)
    }
  })
}

_transaction.addTransaction = (receiver_id, amount, sender_id, sender_type, receiver_type, type, callback) => {
  if (!amount) {
    callback(true, {
      statusCode : 400,
      response   : {
        success : false,
        message : `Please enter a valid amount`
      }
    })
  } else {
    User.findOne({
      where : {
        id : receiver_id
      }
    }).then(user => {
      if (user) {
        const values = {
          sender_type   : sender_type,
          sender_id     : sender_id,
          type          : type,
          receiver_type : receiver_type,
          receiver_id   : receiver_id,
          amount        : amount
        }
  
        Transaction.create(values)
        .then(transaction => {
          _transaction.updateAffectedAccounts(sender_type, sender_id, receiver_type, receiver_id, (error, reply) => {
            if (error) {
              console.log(`Error updating user credit in addCreditToUser:`, reply.message)
              callback(true, {
                statusCode : 500,
                response   : {
                  success : false,
                  message : `Internal server error`
                }
              })
            } else {
              callback(false)
            }
          })
        })
        .catch(e => {
          console.log(`Error creating transaction in addCreditToUser: `, e)
          callback(true, {
            statusCode : 500,
            response   : {
              success : false,
              message : `Internal server error`
            }
          })
        })
      } else {
        callback(true, {
          statusCode : 404,
          response   : {
            success : false,
            message : `User with id ${id} does not exist`
          }
        })
      }
    })
  }
}

module.exports = _transaction