const { RESPONSE } = require('express');

const { MODEL_CATEGORIA } = require('../models');

const OBTENER_CATEGORIAS = async(req, res = RESPONSE ) => {
    const { LIMITE = 5, DESDE = 0 } = req.query;
    const QUERY = { estado: true };
    const [ TOTAL, CATEGORIAS ] = await Promise.all([
        MODEL_CATEGORIA.countDocuments(QUERY),
        MODEL_CATEGORIA.find(QUERY).populate('usuario', 'nombre').skip( Number( DESDE ) ) .limit(Number( LIMITE ))
    ]);
    res.json({
        TOTAL,
        CATEGORIAS
    });
}

const OBTENER_CATEGORIA = async(req, res = RESPONSE ) => {
    const { ID } = req.params;
    const CATEGORIA = await MODEL_CATEGORIA.findById( ID ).populate('usuario', 'nombre');
    res.json( CATEGORIA );
}

const CREAR_CATEGORIA = async(req, res = RESPONSE ) => {
    const NOMBRE = req.body.nombre.toUpperCase();
    const CATEGORIA_DB = await MODEL_CATEGORIA.findOne({ NOMBRE });
    if ( CATEGORIA_DB ) {
        return res.status(400).json({
            msg: `La categoria ${ CATEGORIA_DB.nombre }, ya existe`
        });
    }
    const DATA = {
        nombre,
        usuario: req.usuario._id
    }
    const CATEGORIA = new MODEL_CATEGORIA( DATA );
    await CATEGORIA.save();
    res.status(201).json(CATEGORIA);
}

const ACTUALIZAR_CATEGORIA = async( req, res = RESPONSE ) => {
    const { ID } = req.params;
    const { ESTADO, USUARIO, ...DATA } = req.body;
    DATA.nombre  = DATA.nombre.toUpperCase();
    DATA.usuario = req.usuario._id;
    const CATEGORIA = await MODEL_CATEGORIA.findByIdAndUpdate(ID, DATA, { new: true });
    res.json( CATEGORIA );
}

const BORRAR_CATEGORIA = async(req, res =RESPONSE ) => {
    const { ID } = req.params;
    const CATEGORIA_BORRADA = await MODEL_CATEGORIA.findByIdAndUpdate( ID, { estado: false }, {new: true });
    res.json( CATEGORIA_BORRADA );
}

module.exports = {
    CREAR_CATEGORIA,
    OBTENER_CATEGORIAS,
    OBTENER_CATEGORIA,
    ACTUALIZAR_CATEGORIA,
    BORRAR_CATEGORIA
}