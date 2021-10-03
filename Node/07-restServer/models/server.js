const EXPRESS = require('express');

const CORS = require('cors');

const { DB_CONECTION } = require('../database/config');

class Server {

    constructor(){
        this.app = EXPRESS();
        this.port = process.env.PORT;
        this.paths = {
            auth:'/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias'
        }
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
        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.usuarios,require('../routes/user'));
        this.app.use(this.paths.categorias,require('../routes/categorias'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto',this.port);
        });
    }
}

module.exports = Server;