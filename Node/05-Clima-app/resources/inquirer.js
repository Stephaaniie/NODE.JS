const inquirer = require('inquirer');

const BUSQUEDA = require('./models/busqueda');

require('colors');

const {LEER_DB} = require('./resources/guardarArchivo');

const Tareas = require('./models/listaTarea');

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

const LISTADO_TAREAS_BORRAR = async( tareas = [] ) => {
    const CHOICES = tareas.map( (tarea, i) => {
        let idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`
        }
    });
    CHOICES.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });
    const PREGUNTAS = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            CHOICES
        }
    ]
    let { id } = await inquirer.prompt(PREGUNTAS);
    return id;
}

const CONFIRMAR = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}   

const MOSTRAR_LISTADO_CHECK_LIST = async( tareas = [] ) => {
    const CHOICES = tareas.map( (tarea, i) => {
        let idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });
    const PREGUNTA = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            CHOICES
        }
    ]
    let { ids } = await inquirer.prompt(PREGUNTA);
    return ids;
}

const REALIZAR_OPERACION = async () => {
    let opt = '';
    let tareasDB = LEER_DB();
    let busqueda = new BUSQUEDA();

    if ( tareasDB ) { 
        TAREAS.cargarTareasFromArray( tareasDB );
    }
    do {
        opt = await INQUIRER_MENU();
        switch (opt) {
            case BUSCAR_CIUDAD:                
                let ciudadABuscar = await LEER_INPUT('Ciudad::');
                busqueda.ciudad(ciudadABuscar);
                TAREAS.crearTarea( desc );
            break;
            case HISTORIAL_DE_BUSQUEDA:
                TAREAS.listadoCompleto();
            break;
        }
        GUARDAR_DB( TAREAS.listadoArr );
        await PAUSA();
    } while( opt !== OPCION_TERMINAR );
};

module.exports = {
    REALIZAR_OPERACION
}
