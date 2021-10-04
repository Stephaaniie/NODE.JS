const { ROUTER_EXPRESS } = require('express');

const { CHECK } = require('express-validator');

const ROUTER = ROUTER_EXPRESS();

const { VALIDAR_CAMPOS, VALIDAR_JWT, ES_ADMIN_ROLE, TIENE_ROLE} = require('../middlewares');

const { ES_ROLE_VALIDO, EMAIL_EXISTE, EXISTE_USUARIO_POR_ID } = require('../helpers/db-validators');

const { USUARIOS_GET, USUARIOS_PUT, USUARIOS_POST, USUARIOS_DELETE, USUARIOS_PATH } = require('../controllers/usuarios');

ROUTER.get('/', USUARIOS_GET );

ROUTER.put('/:id',[
    CHECK('id', 'No es un ID válido').isMongoId(),
    CHECK('id').custom( EXISTE_USUARIO_POR_ID ),
    CHECK('rol').custom( ES_ROLE_VALIDO ), 
    VALIDAR_CAMPOS
],USUARIOS_PUT );

ROUTER.post('/',[
    CHECK('nombre', 'El nombre es obligatorio').not().isEmpty(),
    CHECK('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    CHECK('correo', 'El correo no es válido').isEmail(),
    CHECK('correo').custom( EMAIL_EXISTE ),
    // CHECK('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    CHECK('rol').custom( ES_ROLE_VALIDO ), 
    VALIDAR_CAMPOS
], USUARIOS_POST );

ROUTER.delete('/:id',[
    VALIDAR_JWT,
    //ES_ADMIN_ROLE,
    tieneRole('ADMIN_ROLE', 'VENTAR_ROLE','OTRO_ROLE'),
    CHECK('id', 'No es un ID válido').isMongoId(),
    CHECK('id').custom( EXISTE_USUARIO_POR_ID ),
    VALIDAR_CAMPOS
],USUARIOS_DELETE );

ROUTER.patch('/', USUARIOS_PATH );

module.exports = ROUTER;