const ROLE = require('../models/role');

const USUARIO = require('../models/user');

const ES_ROLE_VALIDO = async(rol = '') =>{
    const EXISTE_ROL = await ROLE.findOne({rol});

    if(!EXISTE_ROL){
        throw new Error(`El rol ${rol} no esta registrado en la bd`);
    }
}

const EMAIL_EXISTE = async(correo = '') => {
    const EXISTE_EMAIL = await USUARIO.findOne({correo});
    
    if(EXISTE_EMAIL){
        throw new Error(`El CORREO: ${rol}  esta registrado en la bd`);
    }
}

const EXISTE_USUARIO_POR_ID = async(id) =>{
    const EXISTE_USUARIO = await USUARIO.findById({id});

    if ( !EXISTE_USUARIO ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

module.exports = {
    ES_ROLE_VALIDO,
    EMAIL_EXISTE,
    EXISTE_USUARIO_POR_ID
}