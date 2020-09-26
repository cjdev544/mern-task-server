const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Start Database *****************************************
const { mongoose } = require('./config/database');

// Sittings ***********************************************
app.set('port', process.env.PORT || 4000);  

// Middlewares ********************************************
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes *************************************************
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/login', require('./routes/login.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/tasks', require('./routes/task.routes'));

// Start Server *******************************************
app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}`);
});