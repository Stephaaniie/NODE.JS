const inquirer = require('inquirer');

require('colors');

const {LEER_DB} = require('./resources/guardarArchivo');

const Tareas = require('./models/listaTarea');

const TAREAS = new Tareas();

const CREAR_TAREA_OP = '1';

const LISTADO_COMPLETO_OP = '2';

const LISTADO_TAREA_COMPLETA_OP = '3';

const LISTADO_TAREA_PENDIENTE_OP = '4';

const MOSTRAR_LISTA_CHECK_OP = '5';

const BORRAR_OP = '6';

const OPCION_TERMINAR = '0';

const PREGUNTAS = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Borrar tarea`
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
    if ( tareasDB ) { 
        TAREAS.cargarTareasFromArray( tareasDB );
    }
    do {
        opt = await INQUIRER_MENU();
        switch (opt) {
            case CREAR_TAREA_OP:                
                let desc = await LEER_INPUT('Descripción:');
                TAREAS.crearTarea( desc );
            break;
            case LISTADO_COMPLETO_OP:
                TAREAS.listadoCompleto();
            break;
            case LISTADO_TAREA_COMPLETA_OP:
                TAREAS.listarPendientesCompletadas(true);
            break;
            case LISTADO_TAREA_PENDIENTE_OP: 
                TAREAS.listarPendientesCompletadas(false);
            break;
            case MOSTRAR_LISTA_CHECK_OP:
                let ids = await MOSTRAR_LISTADO_CHECK_LIST( TAREAS.listadoArr );
                TAREAS.toggleCompletadas( ids );
            break;        
            case BORRAR_OP:
                let id = await LISTADO_TAREAS_BORRAR( tareas.listadoArr );
                if ( id !== '0' ) {
                    let ok = await CONFIRMAR('¿Está seguro?');
                    if ( ok ) {
                        TAREAS.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }     break;
        }
        GUARDAR_DB( TAREAS.listadoArr );
        await PAUSA();
    } while( opt !== OPCION_TERMINAR );
};

module.exports = {
    REALIZAR_OPERACION
}
