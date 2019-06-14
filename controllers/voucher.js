/**
|--------------------------------------------------
| Voucher Controllers
|--------------------------------------------------
*/
const {Voucher}             = require('../models/')
const transactionController = require('./transaction')
const logController         = require('./log')

module.exports = {
  create         : (req, res) => {
    const value = {
      code   : req.body.code,
      amount : req.body.amount
    }

    Voucher.create(value)
    .then(voucher => {
      return res.status(200).send({
        success : true,
        message : `Successfully created a voucher`
      })
    })
    .catch(e => {
      if (e.name == 'SequelizeUniqueConstraintError') {
        return res.status(400).send({
          success : false,
          message : `Code already exist`
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
        message : `Failed to create voucher`
      })
    })
  },
  getVoucherList : (req, res) => {
    Voucher.findAll()
      .then(vouchersRawData => {
        var vouchers = []

        vouchersRawData.forEach(voucher => {
          vouchers.push({
            id         : voucher.id,
            code       : voucher.code,
            amount     : voucher.amount,
            is_claimed : voucher.is_claimed ? 'Yes' : 'No',
            claimed_by : voucher.claimed_by,
            claimer_id : voucher.claimer_id,
            createdAt  : voucher.createdAt,
            updatedAt  : voucher.updatedAt,
          })
        })

        const response = {
          success : true,
          message : `Succesfully fetched all vouchers`,
          data    : vouchers
        }
        return res.status(200).send(response)
      }
    )
  },
  getVoucherById : (req, res) => {
    Voucher.findOne({
      where : {
        id  : req.params.id
      }
    }).then(voucher => {
        if (voucher) {
          const response = {
            success : true,
            message : `Succesfully fetched the voucher`,
            data    : {
              id         : voucher.id,
              code       : voucher.code,
              amount     : voucher.amount,
              is_claimed : voucher.is_claimed ? 'Yes' : 'No',
              claimed_by : voucher.claimed_by,
              claimer_id : voucher.claimer_id,
              createdAt  : voucher.createdAt,
              updatedAt  : voucher.updatedAt,
            }
          }
          return res.status(200).send(response)
        } else {
          return res.status(404).send({
            success : false,
            message : `The voucher with id ${req.params.id} does not exist`
          })
        }
      }
    ).catch(e => {
      console.log(`Error viewVoucherById: `, e)
      return res.status(400).send()
    })
  },
  claimVoucher: (req, res) => {
    Voucher.findOne({
      where : {
        code       : req.body.code,
        is_claimed : false
      }
    }).then(voucher => {
      if (voucher) {
        const receiver_id   = req.decoded.id,
              receiver_type = `users`,
              amount        = voucher.amount,
              sender_id     = voucher.id,
              sender_type   = `vouchers`,
              type          = `voucher topup`

        Voucher.update({
          is_claimed : true
        },
        {
          where      : {
            id : sender_id
          }
        }).then(voucher => {
          transactionController.addTransaction(receiver_id, amount, sender_id, sender_type, receiver_type, type, (error, reply) => {
            if (!error) {
              logController.createLog(`User ${receiver_id} topup ${amount} credits through Voucher ${sender_id}`, (error, reply) => {
                if (error) {
                  console.log(`Error creating log for claimVoucher: `, reply.message)
                }
      
                return res.status(200).send({
                  success : true,
                  message : `Succesfully claimed the voucher`
                })
              })
            } else {
              console.log(`Error transfering money to user at claimVoucher: `, reply.message)

              return res.status(reply.statusCode).send(reply.response)
            }
          })
        }).catch(e => {
          console.log(`Error updating voucher claimed at claimVoucher: `, e)

          return res.status(500).send({
            success : false,
            message : `Internal server error`
          })
        })
      } else {
        return res.status(404).send({
          success : false,
          message : `The voucher does not exist or has already been claimed`
        })
      }
    }).catch(e => {
      console.log(`Error fetching the voucher at claimVoucher: `, e)
      return res.status(500).send({
        success : false,
        message : `Internal server error`
      })
    })
  },
  updateVoucher  : (req, res) => {
    const amount = req.body.amount ? req.body.amount : false

    if (amount) {
      Voucher.update({
        amount : amount
      }, 
      {
        where : {
          id : req.params.id
        }
      }).then(() => {
          return res.status(200).send({
            success : true,
            message : `Successfully updated the voucher`
          })
        }).catch(e => {
          console.log(`Error updateVoucher: `, e)
          return res.status(400).send()
        })
    } else {
      return res.status(404).send({
        success : false,
        message : `Missing required field amount`
      })
    }
  }
}