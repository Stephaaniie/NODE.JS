const {response} = require('express');
const { GENERAR_JWT } = require('../helpers/generarJWT');

const USUARIO = require('../models/user');

const BCRYPTS = require('../models/user');

const LOGIN = (req, res = response) => {
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

module.exports = {
    LOGIN
}