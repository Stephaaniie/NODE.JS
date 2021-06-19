console.clear();

const {CREAR_ARCHIVO_TABLA} = require('./resources/multiplicar');

const [,,arg3 = 'base=5'] = process.argv;

const [,base = 5] = arg3.split('=');

CREAR_ARCHIVO_TABLA(base)
    .then(nombreArchivo => console.log(nombreArchivo, 'creado'))
    .catch(err => console.log(err));