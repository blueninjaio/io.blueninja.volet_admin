/**
|--------------------------------------------------
| Auth Middleware
|--------------------------------------------------
*/
const jwt    = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
  checkGeneralAuth    : (req, res, next) => {
    var token = req.headers['authorization']
    if (!token){
      return res.status(403).send({ 
        success : false, 
        message : 'No token provided.' 
      })
    }
    
    jwt.verify(token, config.private_key, (err, decoded) => {
      if (err) {
        return res.status(500).send({ 
          success : false, 
          message : 'Failed to authenticate token.' 
        })
      }

      req.decoded = decoded
      next()
    })
  },
  checkUserAuth       : (req, res, next) => {
    var token = req.headers['authorization']
    if (!token){
      return res.status(403).send({ 
        success : false, 
        message : 'No token provided.' 
      })
    }
    
    jwt.verify(token, config.private_key, (err, decoded) => {
      if (err) {
        return res.status(500).send({ 
          success : false, 
          message : 'Failed to authenticate token.' 
        })
      }

      if (!decoded.is_user) {
        return res.status(403).send({ 
          success : false, 
          message : 'Failed to authenticate token.' 
        })
      }

      req.decoded = decoded
      next()
    })
  },
  checkMerchantAuth   : (req, res, next) => {
    var token = req.headers['authorization']
    if (!token){
      return res.status(403).send({ 
        success : false, 
        message : 'No token provided.' 
      })
    }
    
    jwt.verify(token, config.private_key, (err, decoded) => {
      if (err) {
        return res.status(500).send({ 
          success : false, 
          message : 'Failed to authenticate token.' 
        })
      }

      if (!decoded.is_merchant) {
        return res.status(403).send({ 
          success : false, 
          message : 'Failed to authenticate token.' 
        })
      }

      req.decoded = decoded
      next()
    })
  },
  checkAdminAuth      : (req, res, next) => {
    var token = req.headers['authorization']
    if (!token){
      return res.status(403).send({ 
        success : false, 
        message : 'No token provided.' 
      })
    }
    
    jwt.verify(token, config.private_key, (err, decoded) => {
      if (err) {
        return res.status(500).send({ 
          success : false, 
          message : 'Failed to authenticate token.' 
        })
      }

      if (!decoded.is_admin) {
        return res.status(403).send({ 
          success : false, 
          message : 'Failed to authenticate token.' 
        })
      }

      req.decoded = decoded
      next()
    })
  },
  checkSuperAdminAuth : (req, res, next) => {
    var token = req.headers['authorization']
    if (!token){
      return res.status(403).send({ 
        success : false, 
        message : 'No token provided.' 
      })
    }
    
    jwt.verify(token, config.private_key, (err, decoded) => {
      if (err) {
        return res.status(500).send({ 
          success : false, 
          message : 'Failed to authenticate token.' 
        })
      }

      if (!decoded.is_admin && !decoded.is_super) {
        return res.status(403).send({ 
          success : false, 
          message : 'Failed to authenticate token.' 
        })
      }

      req.decoded = decoded
      next()
    })
  },
}