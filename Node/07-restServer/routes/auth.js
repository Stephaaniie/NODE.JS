const { Router } = require('express');

const { check } = require('express-validator');

const {LOGIN, GOOGLE_SINGIN} = require('../controllers/auth');

const {validarCampos} = require('../middlewares/validarCampos');

const ROUTER = Router();

ROUTER.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contrasenia', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], LOGIN);

ROUTER.post('/google',[
    check('id_token', 'El ID TOKEN es necesario').not().isEmpty(),
    validarCampos
], GOOGLE_SINGIN);

module.exports = ROUTER;