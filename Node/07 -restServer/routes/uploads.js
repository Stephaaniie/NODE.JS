const { ROUTER_EXPRESS } = require('express');

const { CHECK } = require('express-validator');

const { CARGAR_ARCHIVO } = require('../controllers/uploads');

const { VALIDAR_CAMPOS } = require('../middlewares/validar-campos');

const ROUTER = ROUTER_EXPRESS();

ROUTER.put('/', CARGAR_ARCHIVO)

module.exports = ROUTER;