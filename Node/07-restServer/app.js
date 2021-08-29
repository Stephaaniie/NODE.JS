const Server = require('./models/server');

require('dotenv').config();

const SERVER = new Server();

SERVER.listen();