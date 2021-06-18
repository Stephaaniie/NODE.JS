const ID = 1;

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

// await tiene que estar dentro de una funcion o procedimiento asincronico 

const GET_INFO_USUARIO = async(id) => {
    
    try {
        const EMPLEADO = await GET_EMPLEADO(id);
    const SALARIO = await GET_SALARIO(id);

    return `El salario del empleado: ${EMPLEADO} es de ${SALARIO}`;
    } catch (error) {
        throw error;
    }
    
}

GET_INFO_USUARIO(ID)
    .then(mensaje => console.log(mensaje))
    .catch(err => console.log(err));