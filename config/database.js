const mongoose = require('mongoose');
require('dotenv').config({ path: 'vars.env' });

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true , 
    useFindAndModify: false
})
    .then( db => console.log('Database is Conected'))
    .catch( err => console.error(err));

module.exports = mongoose;
