const { RESPONSE, REQUEST } = require('express');

const JWT = require('jsonwebtoken');

const MODELO_USUARIO = require('../models/usuario');

const VALIDAR_JWT = async( req = REQUEST, res = RESPONSE, next ) => {
    const TOKEN = req.header('x-token');
    if ( !TOKEN ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { UID } = JWT.verify( TOKEN, process.env.SECRETORPRIVATEKEY );
        const USUARIO = await MODELO_USUARIO.findById( UID );
        if( !USUARIO ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }
        if ( !USUARIO.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }
        req.usuario = USUARIO;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    VALIDAR_JWT
}