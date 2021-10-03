require('colors');

const MOSTRAR_MENU = () => {
    return new Promise( resolve => {
        console.clear();
        console.log('=========================='.green);
        console.log('  Seleccione una opción'.green);
        console.log('==========================\n'.green);
        console.log(`${ '1.'.green } Buscar Ciudad`);
        console.log(`${ '2.'.green } Mostrar Historial`);
        console.log(`${ '0.'.green } Salir \n`);

        let readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question('Seleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        })
    });
}

const PAUSA = () => {
    return new Promise( resolve => {
        let readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });   
        readline.question(`\nPresione ${ 'ENTER'.green } para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })
    });
}

module.exports = {
    MOSTRAR_MENU,
    PAUSA
}