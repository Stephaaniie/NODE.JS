const { Router } = require('express');

const { check } = require('express-validator');

const {login} = require('../controllers/auth');

const {validarCampos} = require('../middlewares/validarCampos');

const ROUTER = Router();

ROUTER.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contrasenia', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

module.exports = ROUTER;