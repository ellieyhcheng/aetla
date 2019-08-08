'use strict';
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const error = require('errorhandler');

// Connect to database
require('./models');

app.use(cors({
    credentials: true,
    origin: true
}));
app.use(bodyParser.json());

// Route site index at /
app.get('/', (req, res) => {
    res.send('Courselists')
})

const apiRouter = require('./routes/api');
app.use('/api', apiRouter)

// Set up router endpoints
const userRouter = require('./routes/user');
app.use('/user', userRouter);

// const courseRouter = require('./routes/course');
// app.use('/courses', courseRouter);

// const courseListRouter = require('./routes/courseList');
// app.use('/course-list', courseListRouter);

// const plansRouter = require('./routes/plans');
// app.use('/plans', plansRouter);

// Handle Errors
app.use(error());

server.listen(config.server.port, () => {
	console.log('Listening on port ' + config.server.port);
});



