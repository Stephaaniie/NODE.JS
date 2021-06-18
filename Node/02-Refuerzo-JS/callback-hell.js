const ID = 2;

const EMPLEADOS = [
    {
        id: 1,
        nombre: 'Stephanie'
    },
    {
        id:2,
        nombre: 'Sofia'
    },
    {
        id:3,
        nombre: 'Samanta'
    }
];

const SALARIOS = [
    {
        id: 1,
        salario: 1550
    },
    {
        id:2,
        salario: 1000
    },
];

const GET_EMPLEADO = ( id, callback) => {
    
    const EMPLEADO = EMPLEADOS.find(e => e.id === id);
    if(EMPLEADO) {
        callback(null,EMPLEADO.nombre);
    } else {
        callback(`Empleado con id ${id} no existe`); 
    }
}

const GET_SALARIO = (id, callback) =>{

    const SALARIO = SALARIOS.find(e => e.id === id);
    if(SALARIO){
        callback(null, SALARIO.salario);
    } else {
        callback(`No existe salario para el id: ${id}`);
    }
}
/*
GET_EMPLEADO( ID, ( err, empleado ) =>{
    
    if(err){
        console.log('ERROR');
        return console.log(err);
    }
    console.log('Empleado existe!');
    console.log(empleado.nombre);
})

GET_SALARIO(ID,(err,salario) =>{

    if( err ){
        console.log('ERROR!');
        return console.log(err);
    }
    console.log('Empleado con salario existe');
    console.log(salario.salario);
})
*/
GET_EMPLEADO( ID, ( err, empleado ) =>{
    
    if(err){
        console.log('ERROR');
        return console.log(err);
    }
    GET_SALARIO(ID, (err, salario) => {
        if (err) {
            return console.log( err );
        }
        console.log('El empleado: ', empleado, 'tiene un dalario de: ',salario);
    } )
})