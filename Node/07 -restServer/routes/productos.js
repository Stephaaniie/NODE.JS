const { ROUTER_EXPRESS } = require('express');

const { CHECK } = require('express-validator');

const { VALIDAR_JWT, VALIDAR_CAMPOS, ES_ADMIN_ROLE } = require('../middlewares');

const { CREAR_PRODUCTO, OBTENER_PRODUCTOS, OBTENER_PRODUCTO, ACTUALIZAR_PORDUCTO, BORRAR_PRODUCTO } = require('../controllers/productos');

const { EXISTE_CATEGORIA_POR_ID, EXISTE_PRODUCTO_POR_ID } = require('../helpers/db-validators');

const ROUTER = ROUTER_EXPRESS();

ROUTER.get('/', OBTENER_PRODUCTOS );

ROUTER.get('/:id',[
    CHECK('id', 'No es un id de Mongo válido').isMongoId(),
    CHECK('id').custom( EXISTE_PRODUCTO_POR_ID ),
    VALIDAR_CAMPOS,
], OBTENER_PRODUCTO );

ROUTER.post('/', [ 
    VALIDAR_JWT,
    CHECK('nombre','El nombre es obligatorio').not().isEmpty(),
    CHECK('categoria','No es un id de Mongo').isMongoId(),
    CHECK('categoria').custom( EXISTE_CATEGORIA_POR_ID ),
    VALIDAR_CAMPOS
], CREAR_PRODUCTO );

ROUTER.put('/:id',[
    VALIDAR_JWT,
    // CHECK('categoria','No es un id de Mongo').isMongoId(),
    CHECK('id').custom( EXISTE_PRODUCTO_POR_ID ),
    VALIDAR_CAMPOS
], ACTUALIZAR_PORDUCTO );

ROUTER.delete('/:id',[
    VALIDAR_JWT,
    ES_ADMIN_ROLE,
    CHECK('id', 'No es un id de Mongo válido').isMongoId(),
    CHECK('id').custom( EXISTE_PRODUCTO_POR_ID ),
    VALIDAR_CAMPOS,
], BORRAR_PRODUCTO );

module.exports = ROUTER;