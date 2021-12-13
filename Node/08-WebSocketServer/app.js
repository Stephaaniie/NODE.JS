require('dotenv').config();

const SERVER_MODEL = require('./models/server');

const SERVER = new SERVER_MODEL();

SERVER.listen();