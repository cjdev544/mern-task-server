const express = require('express');
const { check } = require('express-validator');
const loginCtrl = require('../controllers/login.controllers');
const auth = require('../middlewares/auth');
const router = express.Router();

// Route: /api/login

// Login User
router.post('/',
    [
        check('email', 'El Email es requerido').notEmpty(),
        check('password', 'El Password es requerido').notEmpty()
    ],
    loginCtrl.loginUser
);

// Get auth user
router.get('/',
    auth,
    loginCtrl.getAuthUser
);

module.exports = router;