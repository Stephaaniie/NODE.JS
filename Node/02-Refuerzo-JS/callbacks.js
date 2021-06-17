/*
setTimeout(function(){
    console.log('Hola Stephy');
}, 1000);
*/

const GET_USUARIO_BY_ID = (id, callback) => {

    const USER = {
        id,
        nombre: 'Stephanie'
    }
    setTimeout(() =>{
        callback(USER);
    },1500)
}

GET_USUARIO_BY_ID(10, (usuario) => {
    console.log(usuario.id);
    console.log(usuario.nombre.toUpperCase());
});