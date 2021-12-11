const { ROUTER_EXPRESS } = require('express');

const { CHECK } = require('express-validator');

const { CARGAR_ARCHIVO, ACTUALIZAR_IMAGEN_CLOUDINARY } = require('../controllers/uploads');

const { VALIDAR_CAMPOS, VALIDAR_ARCHIVO_SUBIR } = require('../middlewares');

const {COLECCIONES_PERMITIDAS } = require('../helpers')

const ROUTER = ROUTER_EXPRESS();

ROUTER.put('/',VALIDAR_ARCHIVO_SUBIR, CARGAR_ARCHIVO);

ROUTER.put('/:coleccion/:id',[
    VALIDAR_ARCHIVO_SUBIR,
    CHECK('id','El id debe de ser de mongo').isMongoId(),
    CHECK('coleccion').custom( c => COLECCIONES_PERMITIDAS(c, ['usuarios','productos'])),
    VALIDAR_CAMPOS,
], ACTUALIZAR_IMAGEN_CLOUDINARY);

module.exports = ROUTER;