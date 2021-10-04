const { ROUTER_EXPRESS } = require('express');

const { BUSCAR } = require('../controllers/buscar');

const ROUTER = ROUTER_EXPRESS();

ROUTER.get('/:coleccion/:termino', BUSCAR )

module.exports = ROUTER;