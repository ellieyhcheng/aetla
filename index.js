'use strict';
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const error = require('errorhandler');
const path = require('path');

// Connect to database
require('./models');

app.use(cors({
    credentials: true,
    origin: true
}));
app.use(bodyParser.json());

// Route site index at /
// app.get('/', (req, res) => {
//     res.send('Connected!')
// })

const apiRouter = require('./routes/api');
app.use('/api', apiRouter)

// Set up router endpoints
const userRouter = require('./routes/user');
app.use('/user', userRouter);

// Handle Errors
app.use(error());

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

server.listen(config.server.port, () => {
	console.log('Listening on port ' + config.server.port);
});
