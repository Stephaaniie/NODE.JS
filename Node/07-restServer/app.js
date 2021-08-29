require('dotenv').config();

const Server = require('./models/server');

const SERVER = new Server();

SERVER.listen();