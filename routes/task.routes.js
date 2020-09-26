const express = require('express');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');
const taskCtrl = require('../controllers/task.controllers');
const router = express.Router();

// Routes /api/tasks

// Create a Task
router.post('/',
    auth,
    [
        check('name', 'El Nombre es requerido').notEmpty()
    ],
    taskCtrl.createTask
);

// Get Tasks of project selected
router.get('/',
    auth,
    taskCtrl.getTasks
);

// Update a Task
router.put('/:id',
    auth,
    [
        check('name', 'El Nombre es requerido').notEmpty()
    ],
    taskCtrl.updateTask
);

// Delete a Task
router.delete('/:id',
    auth,
    taskCtrl.deleteTask
);

module.exports = router;