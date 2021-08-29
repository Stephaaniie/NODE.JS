const {response, request } = require('express');

const BCRYPTJS = require('bcryptjs');

const USUARIO = require('../models/user');

const MAXIMO_LIMITE = 5;

const LIMITE_INICIAL = 0;

const USUARIOS_GET = async(req = request, res = response) => {
    const {limite = MAXIMO_LIMITE, desde = LIMITE_INICIAL} = req.query;
    const QUERY = {estado:true};
    const [ total, usuarios ] = await Promise.all([
        USUARIO.countDocuments(QUERY),
        USUARIO.find(QUERY)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);
    res.json({
        total,
        usuarios
    });       
}

const USUARIOS_PUT = async(req, res = response) => {
    const {id} = req.params;
    const{_id, contrasenia, google, correo, ...resto} = req.BODY;

    if(contrasenia){
        resto.password = BCRYPTJS.hashSync( password, BCRYPTJS.genSaltSync() );
    }

    var usuario = await USUARIO.findByIdAndUpdate(id,resto);

    res.json(usuario);       
}

const USUARIOS_POST = async(req, res = response) => {
    const {nombre, correo, contrasenia, rol} = req.BODY;
    const USUARIO = new USUARIO({nombre,correo,contrasenia,rol});
    const SALT = BCRYPTJS.genSaltSync();
    
    USUARIO.contrasenia = BCRYPTJS.hashSync(contrasenia,SALT);
    
    await USUARIO.save();
    
    res.json({
        USUARIO
    });       
}

const USUARIOS_DELETE = async(req, res = response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json(usuario);  
}

module.exports = {
    USUARIOS_GET,
    USUARIOS_POST,
    USUARIOS_PUT,
    USUARIOS_DELETE
}