const express = require('express');
const userCtrl = require('../controllers/user.controllers');
const router = express.Router();

// Create User
// /api/users
router.post('/',
    userCtrl.createUser
);

module.exports = router;