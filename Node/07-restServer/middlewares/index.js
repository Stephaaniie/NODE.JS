const VALIDAR_CAMPOS = require('../middlewares/validarCampos');

const VALIDAR_JWT = require('../middlewares/validarJWT');

const VALIDAR_ROLES = require('../middlewares/validarRoles');

module.exports = {
    ...VALIDAR_CAMPOS,
    ...VALIDAR_JWT,
    ...VALIDAR_ROLES
};