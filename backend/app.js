const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const connectToDatabase = require('./db/db');

const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.route');

connectToDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/',(req, res) =>{
    res.send('Hello World!');
});

app.use('/user', userRoutes);
app.use('/captain', captainRoutes);

module.exports = app;