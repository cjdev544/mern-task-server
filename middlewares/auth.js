const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    try {
        // Check token of header
        const token = req.header('x-auth-token');
        if(!token) return res.status(400).json({ msg: 'No autorizado' });

        const encryption = jwt.verify(token, 'SECRET_WORD');
        req.user = encryption.user;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'No autorizado' });
    }
};

module.exports = auth;