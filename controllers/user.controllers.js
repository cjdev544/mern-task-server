const userModel = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userCtrl = {};

// Create User
// /api/users
userCtrl.createUser = async (req, res) => {
    
    try {
        const { email, password } = req.body;

        // Check if User exist
        let user = await userModel.findOne({ email: email });
        if(user) return res.status(400).json({ msg: 'El correo ya esta registrado '});

        // Hash password and save User
        user = new userModel(req.body);
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        await user.save();

        // Create and sign Token
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
}

module.exports = userCtrl;