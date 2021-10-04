const { ROUTER_EXPRESS } = require('express');

const { CHECK } = require('express-validator');

const { VALIDAR_CAMPOS } = require('../middlewares/validar-campos');

const { LOGIN, GOOGLE_SING_IN } = require('../controllers/auth');

const ROUTER = ROUTER_EXPRESS();

ROUTER.post('/login',[
    CHECK('correo', 'El correo es obligatorio').isEmail(),
    CHECK('password', 'La contraseña es obligatoria').not().isEmpty(),
    VALIDAR_CAMPOS
],LOGIN );

ROUTER.post('/google',[
    CHECK('id_token', 'El id_token es necesario').not().isEmpty(),
    VALIDAR_CAMPOS
], GOOGLE_SING_IN );

module.exports = ROUTER;