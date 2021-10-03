const { Router } = require('express');

const { buscar } = require('../controllers/buscar');

const ROUTER = Router();

ROUTER.get('/:coleccion/:termino', buscar )

module.exports = router;