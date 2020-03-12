const express = require('express');

// importing helmet
const helmet = require('helmet');

// import routers


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


module.exports = server;