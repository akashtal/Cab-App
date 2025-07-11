const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const captaincontroller = require('../controllers/captain.controller');

router.post('/register',[
    body('fullName.firstName').isLength({min: 2}).withMessage('First name must be at least 2 characters long'),
    body('fullName.lastName').optional().isLength({min: 2}).withMessage('Last name must be at least 2 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.capacity').isInt({gt: 0}).withMessage('Vehicle capacity must be a positive integer'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto-rickshaw']).withMessage('Invalid vehicle type'),

],
captaincontroller.createCaptain );

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
], captaincontroller.loginCaptain);


router.get('/profile', authMiddleware.authCaptain, captaincontroller.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captaincontroller.logoutCaptain);


module.exports = router;