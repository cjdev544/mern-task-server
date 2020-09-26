const express = require('express');
const { check } = require('express-validator');
const projectCtrl = require('../controllers/project.controllers');
const auth = require('../middlewares/auth');
const router = express.Router();

// Route: /api/projects

// Create project
router.post('/',
    auth,
    [
        check('name', 'El Nombre es requerido').notEmpty()
    ],
    projectCtrl.createProject
);

// Get Projects of auth User
router.get('/',
    auth,
    projectCtrl.getProjects
);

// Delete a project
router.delete('/:id',
    auth,
    [
        check('name', 'El Nombre es requerido').notEmpty()
    ],
    projectCtrl.deleteProject
)

module.exports = router;