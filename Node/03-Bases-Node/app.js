console.clear();

const ARGV = require('./config/yargs');
const COLORS = require('colors');
const {CREAR_ARCHIVO_TABLA} = require('./resources/multiplicar');

CREAR_ARCHIVO_TABLA(ARGV.b, ARGV.l, ARGV.h)
    .then(nombreArchivo => console.log(nombreArchivo.rainbow, 'creado'))
    .catch(err => console.log(err));



/*
 * Nunca hacerlo asi porque seria hacerlo por posicion 

const [,,arg3 = 'base=5'] = process.argv;
const [,base = 5] = arg3.split('=');
 */

