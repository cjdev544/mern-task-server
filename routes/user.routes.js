const express = require('express');
const { check } = require('express-validator');
const userCtrl = require('../controllers/user.controllers');
const router = express.Router();

// Create User
// /api/users
router.post('/',
    [
        check('name', 'El nombre es requerido').notEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe tener almenos 6 caracteres').isLength({min: 6})
    ],
    userCtrl.createUser
);

module.exports = router;