const fs = require('fs');

const ARCHIVO = './db/data.json';

const GUARDAR_DB = ( data ) => {
    fs.writeFileSync( ARCHIVO, JSON.stringify(data) );
}

const LEER_DB = () => {
    if( !fs.existsSync(ARCHIVO) ){
        return null;
    }
    return JSON.parse( fs.readFileSync(ARCHIVO, { encoding: 'utf-8' }) );
}

module.exports = {
    GUARDAR_DB,
    LEER_DB
}