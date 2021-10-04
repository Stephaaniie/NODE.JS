const { RESPONSE } = require('express');

const BCRYPTJS = require('bcryptjs')

const MODEL_USUARIO = require('../models/usuario');

const { GENERAR_JWT } = require('../helpers/generar-jwt');

const { GOOGLE_VERIFY } = require('../helpers/google-verify');

const LOGIN = async(req, res = RESPONSE) => {
    const { CORREO, PASSWORD } = req.body;
    try {
        const USUARIO = await MODEL_USUARIO.findOne({ CORREO });
        if ( !USUARIO ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        if ( !USUARIO.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }
        const VALIDAR_PASSWORD = BCRYPTJS.compareSync( PASSWORD, USUARIO.password );
        if ( !VALIDAR_PASSWORD ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        const TOKEN = await GENERAR_JWT( USUARIO.id );
        res.json({
            USUARIO,
            TOKEN
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}

const GOOGLE_SING_IN = async(req, res = response) => {
    const { ID_TOKEN } = req.body;
    try {
        const { CORREO, NOMBRE, IMG } = await GOOGLE_VERIFY( ID_TOKEN );
        let USUARIO = await MODEL_USUARIO.findOne({ CORREO });
        if ( !USUARIO ) {
            const DATA = {
                NOMBRE,
                CORREO,
                password: ':P',
                IMG,
                google: true
            };
            USUARIO = new MODEL_USUARIO( DATA );
            await USUARIO.save();
        }
        if ( !USUARIO.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }
        const TOKEN = await GENERAR_JWT( USUARIO.id );
        res.json({
            USUARIO,
            TOKEN
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }
}

module.exports = {
    LOGIN,
    GOOGLE_SING_IN
}
