const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// User routes

const router = express.Router();

// user routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protected and restricted routes for logged in users
// Protect all routes after this middleware
router.use(authController.protect);

router.patch(
  '/updateMyInfo',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMyInfo,
);
router.get('/myAccount', userController.myAccount, userController.getUser);
router.patch('/updateMyPassword', authController.updatePassword);
router.delete('/deleteMyAccount', userController.deleteMyAccount);

// Admin routes
router.use(authController.restrictTo('admin'));
router
  .route(`/`)
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route(`/:id`)
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
