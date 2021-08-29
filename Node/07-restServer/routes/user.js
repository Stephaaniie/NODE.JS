const EXPRESS = require('express');
const { USUARIOS_GET, USUARIOS_PUT, USUARIOS_POST, USUARIOS_DELETE } = require('../controllers/user');

const ROUTER = EXPRESS.Router();

ROUTER.put('/:id', USUARIOS_PUT);

ROUTER.get('/', USUARIOS_GET);

ROUTER.post('/', USUARIOS_POST);

ROUTER.delete('/', USUARIOS_DELETE);

module.exports = ROUTER;