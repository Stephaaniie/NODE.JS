const VALIDA_CAMPOS = require('../middlewares/validar-campos');

const VALIDAR_JWT = require('../middlewares/validar-jwt');

const VALIDA_ROLES = require('../middlewares/validar-roles');

const VALIDAR_ARCHIVO_SUBIR = require('../middlewares/validar-file');

module.exports = {
    ...VALIDA_CAMPOS,
    ...VALIDAR_JWT,
    ...VALIDA_ROLES,
    ...VALIDAR_ARCHIVO_SUBIR
}