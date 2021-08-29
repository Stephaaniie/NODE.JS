const {response, request } = require('express');

const USUARIOS_GET = (req = request, res = response) => {
    const {id, nombre = 'NOname', apiKey, page = 1, limit} = req.query;
    res.json({
        msg:'get API - Controller',
        id,
        nombre,
        apiKey,
        page,
        limit
    });       
}

const USUARIOS_PUT = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg:'put API - Controller',
        id
    });       
}

const USUARIOS_POST = (req, res = response) => {
    const {nombre, apellido} = req.BODY;
    res.json({
        msg:'post API - Controller',
        nombre, 
        apellido
    });       
}

const USUARIOS_DELETE = (req, res = response) => {
    res.json({
        msg:'delete API - Controller'
    });       
}

module.exports = {
    USUARIOS_GET,
    USUARIOS_POST,
    USUARIOS_PUT,
    USUARIOS_DELETE
}