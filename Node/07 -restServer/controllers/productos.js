const { RESPONSE } = require('express');
const { MODEL_PRODUCTO } = require('../models');


const OBTENER_PRODUCTOS = async(req, res = RESPONSE ) => {
    const { LIMITE = 5, DESDE = 0 } = req.query;
    const QUERY = { estado: true };

    const [ total, productos ] = await Promise.all([
        MODEL_PRODUCTO.countDocuments(QUERY),
        MODEL_PRODUCTO.find(QUERY).populate('usuario', 'nombre').populate('categoria', 'nombre').skip( Number( DESDE ) ).limit(Number( LIMITE ))
    ]);
    res.json({
        total,
        productos
    });
}

const OBTENER_PRODUCTO = async(req, res = RESPONSE ) => {
    const { ID } = req.params;
    const PRODUCTO = await MODEL_PRODUCTO.findById( ID ).populate('usuario', 'nombre').populate('categoria', 'nombre');
    res.json( PRODUCTO );
}

const CREAR_PRODUCTO = async(req, res = RESPONSE ) => {
    const { ESTADO, USUARIO, ...body } = req.body;
    const PRODUCTO_DB = await MODEL_PRODUCTO.findOne({ nombre: body.nombre });
    if ( PRODUCTO_DB ) {
        return res.status(400).json({
            msg: `El producto ${ PRODUCTO_DB.nombre }, ya existe`
        });
    }
    const DATA = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    const PRODUCTO = new MODEL_PRODUCTO( DATA );
    await PRODUCTO.save();
    res.status(201).json(PRODUCTO);
}

const ACTUALIZAR_PRODUCTO = async( req, res = RESPONSE ) => {
    const { ID } = req.params;
    const { ESTADO, USUARIO, ...DATA } = req.body;
    if( DATA.nombre ) {
        DATA.nombre  = DATA.nombre.toUpperCase();
    }
    DATA.usuario = req.usuario._id;
    const PRODUCTO = await MODEL_PRODUCTO.findByIdAndUpdate(ID, DTA, { new: true });
    res.json( PRODUCTO );
}

const BORRAR_PRODUCTO = async(req, res = RESPONSE ) => {
    const { ID } = req.params;

    const PRODUCTO_BORRADO = await Producto.findByIdAndUpdate( ID, { estado: false }, {new: true });

    res.json( PRODUCTO_BORRADO );
}

module.exports = {
    CREAR_PRODUCTO,
    OBTENER_PRODUCTOS,
    OBTENER_PRODUCTO,
    ACTUALIZAR_PRODUCTO,
    BORRAR_PRODUCTO
}