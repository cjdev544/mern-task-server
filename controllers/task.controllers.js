const taskModel = require('../models/Task');
const projectModel = require('../models/Project');
const { validationResult } = require('express-validator');

const taskCtrl = {};

// Create a Task
taskCtrl.createTask = async (req, res) => {
    
    try {
        // validationResult
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        // Check if Project exist
        const project = await projectModel.findById(req.body.projectId)
        if(!project) return res.status(404).json({ msg: 'El Proyecto no existe' });

        // Auth the User width project
        if(project.userId.toString() !== req.user.id) return res.status(400).json({ msg: 'No autorizado' });

        const task = new taskModel(req.body);
        await task.save();
        res.json({ task });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error' });
    }
};


// Get tasks of project selected
taskCtrl.getTasks = async (req, res) => {

    try {
        // Check if Project exist
        const project = await projectModel.findById(req.body.projectId);
        if(!project) return res.status(404).json({ msf: 'El proyecto no exciste' });

        // Auth the User width project
        if(project.userId.toString() !== req.user.id) return res.status(400).json({ msg: 'No autorizado' });

        // get Tasks
        const tasks = await taskModel.find({ projectId: req.body.projectId });
        res.json({ tasks });

        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: 'Hubo un error' });
    }
};


// Update Task
taskCtrl.updateTask = async (req, res) => {

    // validationResult
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        // Check if Task exist
        console.log(req.params.id)
        let task = await taskModel.findById(req.params.id);
        if(!task) return res.status(400).json({ msg: 'La Tarea no existe' });

        // Auth the User width task
        const project = await projectModel.findById(task.projectId);
        if(project.userId.toString() !== req.user.id) return res.status(400).json({ msg: 'No autorizado' });

        // Update Task
        task.name = req.body.name;
        task.stade = req.body.stade;
        task = await taskModel.findOneAndUpdate({ _id: req.params.id }, { $set: task }, { new: true });
        res.json({ task });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error' });
    }

};


// Delete a Task
taskCtrl.deleteTask = async (req, res) => {

    try {
        // Chek if Task exist
        const task = await taskModel.findById(req.params.id);
        if(!task) return res.status(400).json({ msg: 'La Tarea no existe' });

        // Auth the User width task
        const project = await projectModel.findById(task.projectId);
        if(project.userId.toString() !== req.user.id) return res.status(400).json({ msg: 'No autorizado' });

        // Delete Task
        await taskModel.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea eliminada' });
        
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error' });
    }
};

module.exports = taskCtrl;