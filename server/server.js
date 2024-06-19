const express = require('express');
const cors = require('cors');

const connectDB = require('./db/db')

const itemRoutes = require('./router/itemRouters')

// create express app

const app = express();

// configure expres app
app.use(express.json());
app.use(cors());

app.use('/api/name',itemRoutes)


app.listen('3041',()=>{
    console.log(`server running on port ${3041}`)
})