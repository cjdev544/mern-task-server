const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    stade: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Task', taskSchema);