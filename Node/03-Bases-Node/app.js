console.clear();

const FS = require('fs');
const {CREAR_ARCHIVO_TABLA} = require('./resources/multiplicar');
const BASE = 10;

CREAR_ARCHIVO_TABLA(BASE)
    .then(nombreArchivo => console.log(nombreArchivo, 'creado'))
    .catch(err => console.log(err));