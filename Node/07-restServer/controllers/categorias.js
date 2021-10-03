const { response } = require('express');

const {Categoria} = require('../models');

const CREAR_CATEGORIA = async(req, res = response) => {

    const NOMBRE = req.BODY.nombre.toUpperCase();
    const CATEGORIA_DB = await Categoria.findOne({nombre});

    if (CATEGORIA_DB) {
        return res.status(400).json({
            msg: `La categoria ${CATEGORIA_DB.nombre}, ya existe`
        });
    }

    const DATA = {
        nombre,
        usuario: req.usuario._id
    }

    const CATEGORIA = new Categoria(DATA);
    await CATEGORIA.save();
    res.status(201).json(CATEGORIA);
}

module.exports = {
    CREAR_CATEGORIA
}