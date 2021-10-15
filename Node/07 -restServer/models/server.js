const EXPRESS = require('express');

const CORS = require('cors');

const FILE_UPLOAD = require('express-fileUpload');

const { DB_CONNECTION } = require('../database/config');

class Server {
    constructor() {
        this.app  = EXPRESS();
        this.port = process.env.PORT;
        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            uploads:   '/api/uploads',
        }
        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    async conectarDB() {
        await DB_CONNECTION();
    }
    middlewares() {
        this.app.use( CORS() );
        this.app.use( EXPRESS.json() );
        this.app.use( EXPRESS.static('public') );
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
    }
    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;