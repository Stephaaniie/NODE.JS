const Tarea = require('./tarea');

class Tareas {

    _listado = {
        'abc': 123
    };

    constructor() {
        this._listado = {};
    }

    
    get listadoArr() {
        let listado = [];
        Object.keys(this._listado).forEach( key => {
            let tarea = this._listado[key];
            listado.push( tarea );
        });
        return listado;
    }

    borrarTarea( id = '' ) {
        if ( this._listado[id] ) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ) {
        let tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach( (tarea, i) => {
            let idx = `${i + 1}`.green;
            let { desc, completadoEn } = tarea;
            let estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            console.log(`${ idx } ${ desc } :: ${ estado }`);
        });         
    }

    listarPendientesCompletadas( completadas = true ) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea => {
            let { desc, completadoEn } = tarea;
            let estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            if ( completadas ) {
                if ( completadoEn ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }
            } else {
                if ( !completadoEn ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
                }
            }

        });     
    }

    toggleCompletadas( ids = [] ) {
        ids.forEach( id => {
            let tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
        });
        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}
module.exports = Tareas;
