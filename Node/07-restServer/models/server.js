const EXPRESS = require('express');

const CORS = require('cors');

const { DB_CONECTION } = require('../database/config');

class Server {

    constructor(){
        this.app = EXPRESS();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB() {
        await DB_CONECTION();
    }

    middlewares() {
        this.app.use(CORS());
        this.app.use(EXPRESS.json());
        this.app.use(EXPRESS.static('public'));
    }

    routes() {
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.usuariosPath,require('../routes/user'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto',this.port);
        });
    }
}

module.exports = Server;