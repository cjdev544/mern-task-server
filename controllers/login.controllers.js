const userModel = require('../models/User');
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginCtrl = {};

// Login User
loginCtrl.loginUser = async (req, res) => {

    // validationResult
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.json(400).json({ errors: errors.array() });
    
    try {
        // Cheq if User exist
        const { email, password } = req.body;
        let user = await userModel.findOne({ email: email });
        if(!user) return res.status(404).json({ msg: 'El usuario no existe' });

        // Password validation
        const passwordLogin = await bcryptjs.compare(password, user.password);
        if(!passwordLogin) return res.status(400).json({ msg: 'Password Incorrecto' });

        // Create and sign token
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, 'SECRET_WORD', {
            expiresIn: 7200
        }, (error, token) => {
            if(error) throw error;
            res.json({ token });
        });

        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error' });
    }
};


// Get auth User
loginCtrl.getAuthUser = async (req, res) => {
    
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        res.json({ user });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error' });
    }
};

module.exports = loginCtrl;