require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./dbConfig');
const { getRouter } = require('./routes');
const cors = require('cors');
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use('/', getRouter);

app.get('/ping', (req, res) => {
    res.send('pong');
});


const port = 3000;

const starter = async() => {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
        });
        
    } catch (error) {
        console.log(error.message)        
    }
}

starter()
