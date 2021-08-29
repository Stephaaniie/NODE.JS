const { Router } = require('express');

const { check } = require('express-validator');

const { USUARIOS_GET, USUARIOS_PUT, USUARIOS_POST, USUARIOS_DELETE } = require('../controllers/user');

const { validarCampos } = require('../middlewares/validar-campos');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { VALIDAR_JWT } = require('../middlewares/validarJWT');

const ROUTER = Router();

ROUTER.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
], USUARIOS_PUT);

ROUTER.get('/', USUARIOS_GET);

ROUTER.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ), 
    validarCampos
], USUARIOS_POST);

ROUTER.delete('/:id',[
    VALIDAR_JWT,
    tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], USUARIOS_DELETE);


module.exports = ROUTER;