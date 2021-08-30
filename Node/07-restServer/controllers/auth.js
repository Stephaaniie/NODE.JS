const {response} = require('express');
const { GENERAR_JWT } = require('../helpers/generarJWT');
const { GOOGLE_VERIFY } = require('../helpers/googleVerify');

const USUARIO = require('../models/user');

const BCRYPTS = require('../models/user');

const LOGIN = async(req, res = response) => {
    const {correo, contrasenia} = req.BODY;
    try {
        const usuario = await USUARIO.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg:'Usuario/contrasenia es incorrecto'
            });
        }
        if (!usuario.estado) {
            return res.status(400).json({
                msg:'Usuario/contrasenia es incorrecto'
            });
        }
        const validarPass = BCRYPTS.compareSync(contrasenia, usuario.contrasenia);
        if (!validarPass) {
            return res.status(400).json({
                msg:'Usuario/contrasenia es incorrecto'
            });
        }
        const TOKEN =await GENERAR_JWT(usuario.id);
        res.json({
            usuario,
            TOKEN
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msn:'Contactar al admin'
        }); 
    }
    
}

const GOOGLE_SINGIN = async (req, res = response) => {
    const {id_token} = req.BODY;
    try {
        const {correo, nombre, img} = await GOOGLE_VERIFY(id_token);
        let usuario = await USUARIO.findOne({correo})
       
        if (!usuario) {
            const DATA = {
                nombre,
                correo,
                contrasenia
            }
            usuario = new USUARIO(DATA);
            await usuario.save();
        }

        if (usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el admin, usuario bloqueado'
            });
        }
        const TOKEN = await GENERAR_JWT(usuario.id);
        res.json({
            usuario,
            TOKEN
        });
        
    } catch (error) {
        res.status(400).json({
            msg: 'El token no es reconocido',
        });
    }
}

module.exports = {
    LOGIN,
    GOOGLE_SINGIN
}