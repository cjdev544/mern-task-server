const projectModel = require('../models/Project');
const taskModel = require('../models/Task');
const { validationResult } = require('express-validator');

const projectCtrl = {};

// Create a Project
projectCtrl.createProject = async (req, res) => {
   
    // validationResult
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        let project = new projectModel(req.body);
        project.userId = req.user.id;
        await project.save();
        res.json({ project });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error' });
    }

};


// Get projects of auth User
projectCtrl.getProjects = async (req, res) => {
    
    try {
        // find all projects of auth User
        const projects = await projectModel.find({ userId: req.user.id }).sort({date: -1});
        res.json({ projects });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error' });
    }
};


// Delate a project
projectCtrl.deleteProject = async (req, res) => {
    
    try {
        // Chech if Project exist
        let project = await projectModel.findById(req.params.id);
        if(!project) return res.status(404).json({ msg: 'El projecto no existe' });

        // Auth the User width project
        if(project.userId.toString() !== req.user.id) return res.status(400).json({ msg: 'No autorizado' });

        // Delete all Task of Project selected
        const tasks = await taskModel.find({ projectId: req.params.id });
        if(tasks) {
            tasks.forEach( async task => {
                await taskModel.findOneAndRemove({ _id: task._id });
            });
        }

        await projectModel.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Projecto eliminado' });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Hubo un error' });
    }
};

module.exports = projectCtrl;