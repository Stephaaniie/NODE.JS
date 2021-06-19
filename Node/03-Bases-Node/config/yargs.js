const ARGV = require('yargs')
    .options('b',{
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Es la base de la tabala de multiplicar'
    })
    .options('h',{
        alias: 'hasta',
        type: 'number',
        default: 10,
        describe: 'Es el limite que se desea que se calcule la tabla de multiplicar'
    })
    .options('l', {
        alias: 'listar',
        type: 'boolean',
        demandOption: true,
        default: false,
        describe: 'Muestra la tabla por consola'

    })
    .check((argv, options) => {
        if (isNaN(argv.b)) {
            throw 'La base tiene que ser un nemero'
        }
        return true;
    })
    .argv;

module.exports = ARGV;