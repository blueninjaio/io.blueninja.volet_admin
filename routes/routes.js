/**
|--------------------------------------------------
| Routes
|--------------------------------------------------
*/
const {
  checkGeneralAuth, 
  checkUserAuth, 
  checkAdminAuth, 
  checkSuperAdminAuth, 
  checkMerchantAuth
}                        = require('../middlewares/auth')
const userController     = require('../controllers/user')
const merchantController = require('../controllers/merchant')
const adminController    = require('../controllers/admin')
const voucherController  = require('../controllers/voucher')
const pushController     = require('../controllers/push')
const router             = require('express').Router()

/**
|--------------------------------------------------
| User
|--------------------------------------------------
*/
router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
router.post('/user/profile/update', checkUserAuth, userController.updateProfile)
router.post('/user/change-password', checkUserAuth, userController.changePassword)
router.get('/user/aboutme', checkUserAuth, userController.aboutme)
router.get('/user/:id', checkGeneralAuth, userController.about)
router.put('/user/:id/push/add', userController.addPushToken)

/**
|--------------------------------------------------
| Merchant
|--------------------------------------------------
*/
router.post('/merchant/register', merchantController.register)
router.post('/merchant/login', merchantController.login)
router.post('/merchant/change-password', checkMerchantAuth, merchantController.changePassword)
router.get('/merchant/aboutme', checkMerchantAuth, merchantController.aboutme)
router.put('/merchant/:id/push/add', merchantController.addPushToken)

/**
|--------------------------------------------------
| Admin
|--------------------------------------------------
*/
router.post('/admin/register', adminController.register)
router.post('/admin/login', adminController.login)
router.get('/admin/admins', checkSuperAdminAuth, adminController.getAdminList)
router.post('/admin/admins/add', checkSuperAdminAuth, adminController.addAdmin)
router.delete('/admin/admins/:id/archive', checkSuperAdminAuth, adminController.archiveAdmin)
router.get('/admin/users', checkAdminAuth, adminController.getUserList)
router.get('/admin/users/:id', checkAdminAuth, adminController.viewUserById)
router.delete('/admin/users/:id/archive', checkAdminAuth, adminController.archiveUser)
router.get('/admin/merchants', checkAdminAuth, adminController.getMerchantList)
router.get('/admin/merchants/:id', checkAdminAuth, adminController.viewMerchantById)
router.delete('/admin/merchants/:id/archive', checkAdminAuth, adminController.archiveMerchant)
router.get('/admin/transactions', checkAdminAuth, adminController.viewTransactions)
router.get('/admin/transactions/:id', checkAdminAuth, adminController.viewTransactionById)

/**
|--------------------------------------------------
| Transaction
|--------------------------------------------------
*/
router.post('/admin/users/:id/credit/add', checkAdminAuth, adminController.addCreditToUser)
router.post('/admin/users/:id/credit/remove', checkAdminAuth, adminController.removeUserCredit)
router.post('/user/credit/send', checkUserAuth, userController.sendCredit)
router.get('/user/credit/request', checkUserAuth, userController.getCreditRequest)
router.post('/user/credit/request', checkUserAuth, userController.requestCredit)
router.post('/user/credit/request/:id/approve', checkUserAuth, userController.approveCreditRequest)
router.post('/user/credit/request/:id/decline', checkUserAuth, userController.declineCreditRequest)

/**
|--------------------------------------------------
| Voucher
|--------------------------------------------------
*/
router.post('/admin/vouchers/create', checkAdminAuth, voucherController.create)
router.get('/admin/vouchers', checkAdminAuth, voucherController.getVoucherList)
router.get('/admin/vouchers/:id', checkAdminAuth, voucherController.getVoucherById)
router.put('/admin/vouchers/:id/update', checkAdminAuth, voucherController.updateVoucher)

router.post('/user/vouchers/claim', checkUserAuth, voucherController.claimVoucher)

/**
|--------------------------------------------------
| Log
|--------------------------------------------------
*/
router.get('/admin/logs', checkAdminAuth, adminController.viewLogs)

/**
|--------------------------------------------------
| Push
|--------------------------------------------------
*/
router.post('/admin/push', checkAdminAuth, pushController.push)

module.exports = router