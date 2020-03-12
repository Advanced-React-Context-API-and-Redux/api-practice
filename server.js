const express = require('express');

// importing helmet
const helmet = require('helmet');

// import routers
const showsRouter = require('./data/routers/showsRouter.js');
const charactersRouter = require('./data/routers/charactersRouter.js');

// creates the server instance
const server = express();

// allowing express to parse json
server.use(express.json());
server.use(helmet());

// initial route to check server
server.get('/', (req, res) => {
    res.status(200).json({ message: "The server is running 🤙!!"});
});

// set the routers
// tells the server to use these routers
server.use('/api/shows', showsRouter);
server.use('/api/characters', charactersRouter);

module.exports = server;