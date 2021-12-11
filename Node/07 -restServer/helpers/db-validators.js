const ROLE = require('../models/role');
const { USUARIO, CATEGORIA, PRODUCTO } = require('../models');

const ES_ROLE_VALIDO = async(rol = '') => {
    const EXISTE_ROL = await ROLE.findOne({ rol });
    if ( !EXISTE_ROL ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const EMAIL_EXISTE = async( correo = '' ) => {
    const EXISTE_MAIL = await USUARIO.findOne({ correo });
    if ( EXISTE_MAIL ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const EXISTE_USUARIO_POR_ID = async( id ) => {
    const EXISTE_USUARIO = await USUARIO.findById(id);
    if ( !EXISTE_USUARIO ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const EXISTE_CATEGORIA_POR_ID = async( id ) => {
    const EXISTE_CATEGORIA = await CATEGORIA.findById(id);
    if ( !EXISTE_CATEGORIA ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const EXISTE_PRODUCTO_POR_ID = async( id ) => {
    const EXISTE_PRODUCTO = await PRODUCTO.findById(id);
    if ( !EXISTE_PRODUCTO ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const COLECCIONES_PERMITIDAS = (coleccion='', colecciones = [])=>{
    const INCLUIDAS = colecciones.includes(coleccion);
    if(!INCLUIDAS){
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }
}

module.exports = {
    ES_ROLE_VALIDO,
    EMAIL_EXISTE,
    EXISTE_USUARIO_POR_ID,
    EXISTE_PRODUCTO_POR_ID,
    EXISTE_CATEGORIA_POR_ID,
    COLECCIONES_PERMITIDAS
}