const EXPRESS = require('express');

const CORS = require('cors');

const { SOCKET_CONTROLLER } = require('../sockets/controller');

class Server {
    constructor() {
        this.app  = EXPRESS();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.port = process.env.PORT;
        this.paths = {}
        this.middlewares();
        this.routes();
    }
    
    middlewares() {
        this.app.use( CORS() );
        this.app.use( EXPRESS.static('public') );
    }
    routes() {
    }
    sockets() {
        this.io.on('connection', SOCKET_CONTROLLER);
    }
    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
    
}

module.exports = Server;