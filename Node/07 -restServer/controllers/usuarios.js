const { RESPONSE, REQUEST } = require('express');

const BCRYPTJS = require('bcryptjs');

const MODEL_USUARIO = require('../models/usuario');

const USUARIOS_GET = async(req = REQUEST, res = RESPONSE) => {

    const { LIMITE = 5, DESDE = 0 } = req.query;
    
    const QUERY = { estado: true };

    const [ TOTAL, USUARIOS ] = await Promise.all([
        MODEL_USUARIO.countDocuments(QUERY),
        MODEL_USUARIO.find(QUERY).skip( Number( DESDE ) ).limit(Number( LIMITE ))
    ]);
    res.json({
        TOTAL,
        USUARIOS
    });
}

const USUARIOS_POST = async(req, res = RESPONSE) => {
    
    const { NOMBRE, CORREO, PASSWORD, ROL } = req.body;
    
    const USUARIO = new MODEL_USUARIO({ NOMBRE, CORREO, PASSWORD, ROL });

    const SALT = BCRYPTJS.genSaltSync();
  
    USUARIO.password = BCRYPTJS.hashSync( PASSWORD, SALT );

    await USUARIO.save();

    res.json({
        USUARIO
    });
}

const USUARIOS_PUT = async(req, res = RESPONSE) => {
    const { ID } = req.params;

    const { _ID, PASSWORD, GOOGLE, CORREO, ...RESTO } = req.body;

    if ( PASSWORD ) {
        const SALT = BCRYPTJS.genSaltSync();
        RESTO.password = BCRYPTJS.hashSync( password, salt );
    }

    const USUARIO = await MODEL_USUARIO.findByIdAndUpdate( id, resto );

    res.json(USUARIO);
}

const USUARIOS_PATH = (req, res = RESPONSE) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const USUARIOS_DELETE = async(req, res = RESPONSE) => {
    const { ID } = req.params;
    
    const USUARIO = await MODEL_USUARIO.findByIdAndUpdate( ID, { estado: false } );

    res.json(USUARIO);
}

module.exports = {
    USUARIOS_GET,
    usuariosPost,
    USUARIOS_PUT,
    USUARIOS_PATH,
    USUARIOS_DELETE,
}