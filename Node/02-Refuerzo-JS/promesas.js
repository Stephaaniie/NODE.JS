const ID = 10;

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

const GET_EMPLEADO = (id) => {
    return new Promise ((resolve, reject) => {

        const EMPLEADO = EMPLEADOS.find(e => e.id === id)?.nombre;
        (EMPLEADO) 
            ? resolve(EMPLEADO)
            : reject(`No existe el empleado con el id: ${id}`);
    });
}

const GET_SALARIO = (id) => {
    return new Promise ((resolve, reject) =>{
        const SALARIO = SALARIOS.find(s => s.id === id)?.salario;
        (SALARIO) 
            ? resolve(SALARIO)
            : reject(`No existe salario para el id: ${id}`);
    });
}
/*
GET_EMPLEADO(ID)
    .then(empleado => console.log(empleado))
    .catch(err => console.log(err));


GET_SALARIO(ID)
    .then(salario => console.log(salario))
    .catch(err => console.log(err));

GET_EMPLEADO(ID)
    .then(empleado => {
        GET_SALARIO(ID) 
            .then(salario => {
                console.log('El empleado:',empleado, ' tiene un salario de:',salario);
            })
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
*/

//PROMESAS EN CADENA

let nombre;

GET_EMPLEADO(ID)
    .then(empleado => {
        nombre = empleado;
        return GET_SALARIO(ID)
    })
    .then(salario => console.log('El empleado:',nombre, 'tiene un salario de:',salario))
    .catch(err => console.log(err));