const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//midleware
app.use(cors());
app.use(bodyParser.json());

//Import Routes

const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);
const authRoute = require('./routes/auth');
app.use('/auth', authRoute)

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log("connected to database")
);


//LISTENING
app.listen(3000);