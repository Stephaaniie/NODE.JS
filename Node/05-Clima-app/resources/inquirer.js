const inquirer = require('inquirer');

const BUSQUEDA = require('./models/busqueda');

require('colors');

require('dotenv').config()

const {LEER_DB} = require('./resources/guardarArchivo');

const TAREA = require('./models/listaTarea');

const TAREAS = new Tareas();

const BUSCAR_CIUDAD = '1';

const HISTORIAL_DE_BUSQUEDA = '2';

const OPCION_TERMINAR = '0';

const PREGUNTAS = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Buscar Ciudad`
            },
            {
                value: '2',
                name: `${ '2.'.green } Historial de Busqueda`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir`
            },
            
        ]
    }
];

const INQUIRER_MENU = async() => {
    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción'.white );
    console.log('==========================\n'.green);

    const { opcion } = await inquirer.prompt(PREGUNTAS);

    return opcion;
}

const PAUSA = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green } para continuar`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

const LEER_INPUT = async( message ) => {
    let question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    let { desc } = await inquirer.prompt(question);
    return desc;
}

const LISTAR_LUGARES = async( lugares = [] ) => {
    const CHOICES = lugares.map( (lugar, i) => {
        const IDX = `${i + 1}.`.green;
        return {
            value: lugar.id,
            name:  `${ IDX } ${ lugar.nombre }`
        }
    });
    CHOICES.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });
    const PREGUNTAS = [{
        type: 'list',
        name: 'id',
        message: 'Seleccione lugar:',
        CHOICES
    }]
    const { id } = await inquirer.prompt(PREGUNTAS);
    return id;
}

const CONFIRMAR = async(message) => {
    const QUESTION = [{
        type: 'confirm',
        name: 'ok',
        message
    }];
    const { ok } = await inquirer.prompt(QUESTION);
    return ok;
}   

const MOSTRAR_LISTADO_CHECK_LIST = async( tareas = [] ) => {
    const CHOICES = tareas.map( (tarea, i) => {
        const IDX = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name:  `${ IDX } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });
    const PREGUNTA = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        CHOICES
    }]
    const { IDS } = await inquirer.prompt(PREGUNTA);
    return IDS;
}

const REALIZAR_OPERACION = async () => {
    let busqueda = new BUSQUEDA();
    let opt;
    do {
        opt = await INQUIRER_MENU();
        switch (opt) {
            case BUSCAR_CIUDAD:                
                let ciudadABuscar = await LEER_INPUT('Ciudad::');
                busqueda.ciudad(ciudadABuscar);
                TAREAS.crearTarea( desc );
                const TERMINO = await leerInput('Ciudad: ');
                const LUGARES = await busqueda.ciudad( TERMINO );
                const ID = await listarLugares(LUGARES);
                if ( ID === '0' ) continue;
                const LUGAR_SEL = LUGARES.find( l => l.id === ID );
                busqueda.agregarHistorial( LUGAR_SEL.nombre );
                const CLIMA = await busqueda.climaLugar( LUGAR_SEL.lat, LUGAR_SEL.lng );

                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', LUGAR_SEL.nombre.green );
                console.log('Lat:', LUGAR_SEL.lat );
                console.log('Lng:', LUGAR_SEL.lng );
                console.log('Temperatura:', CLIMA.temp );
                console.log('Mínima:', CLIMA.min );
                console.log('Máxima:', CLIMA.max );
                console.log('Como está el clima:',  CLIMA.desc.green );
            break;
            case HISTORIAL_DE_BUSQUEDA:
                TAREAS.listadoCompleto();
            break;
        }
        if (opt !== 0) {
            await PAUSA();
        }
    } while( opt !== OPCION_TERMINAR );
};

module.exports = {
    REALIZAR_OPERACION
}
