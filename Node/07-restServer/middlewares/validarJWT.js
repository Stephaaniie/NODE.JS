const { response, request } = require('express');

const JWT = require('jsonwentoken');

const USUARIO = require('../models/usuario');

const VALIDAR_JWT = (req, res = Response, next) => {
    const TOKEN = req.header('x-token');

    if (!TOKEN) {
        return res.status(401).json({
            msg: 'No hay TOKEN en la peticion'
        });
    }
    try {
        const {usuarioId} = JWT.verify(TOKEN.process.env.SECRETO_PRIVADO_TOKEN);
        const USUARIO = await USUARIO.findById( uid );

        if( !USUARIO ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true
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
            msg: 'No hay TOKEN en la peticion'
        });
    }
}

module.exports = {
    VALIDAR_JWT
}