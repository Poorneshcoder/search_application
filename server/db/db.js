const mongoose = require('mongoose');

require('dotenv').config();


const connectDB = mongoose.connect(process.env.MONGODB_URL).then(()=>console.log('database connected')).catch((error)=>console.log(error));

module.exports = connectDB;