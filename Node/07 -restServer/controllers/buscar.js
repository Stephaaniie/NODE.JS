const { RESPONSE } = require('express');

const { OBJECT_ID } = require('mongoose').Types;

const { MODEL_USUARIO, MODEL_CATEGORIA, MODEL_PRODUCTO } = require('../models');

const COLECCIONES_PERMITIDAS = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const BUSCAR_USUARIOS = async( termino = '', res = RESPONSE ) => {
    const ES_MONGOID = OBJECT_ID.isValid( termino ); 
    const USUARIO = await MODEL_USUARIO.findById(termino);
    return res.json({
        results: ( USUARIO ) ? [ USUARIO ] : []
    });
    const REGEX = new RegExp( termino, 'i' );
    const USUARIOS = await MODEL_USUARIO.find({
        $or: [{ nombre: REGEX }, { correo: REGEX }],
        $and: [{ estado: true }]
    });
    res.json({
        results: USUARIOS
    });
    
}

const BUSCAR_CATEGORIAS = async( termino = '', res = RSPONSE ) => {
    const ES_MONGOID = OBJECT_ID.isValid( termino );
    if ( ES_MONGOID ) {
        const CATEGORIA = await MODEL_CATEGORIA.findById(termino);
        return res.json({
            results: ( CATEGORIA ) ? [ CATEGORIA ] : []
        });
    }
    const REGEX = new RegExp( termino, 'i' );
    const CATEGORIAS = await MODEL_CATEGORIA.find({ nombre: REGEX, estado: true });
    res.json({
        results: CATEGORIAS
    });
}

const BUSCAR_PRODUCTOS = async( termino = '', res = RESPONSE ) => {
    const ES_MONGOID = OBJECT_ID.isValid( termino ); 
    if ( ES_MONGOID ) {
        const PRODUCTO = await MODEL_PRODUCTO.findById(termino).populate('categoria','nombre');
        return res.json({
            results: ( PRODUCTO ) ? [ PRODUCTO ] : []
        });
    }
    const REGEX = new RegExp( termino, 'i' );
    const PRODUCTOS = await MODEL_PRODUCTO.find({ nombre: REGEX, estado: true }).populate('categoria','nombre')
    res.json({
        results: PRODUCTOS
    });

}

const BUSCAR = ( req, res = RESPONSE ) => {
    const { COLECCION, TERMINO  } = req.params;
    if ( !COLECCIONES_PERMITIDAS.includes( COLECCION ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ COLECCIONES_PERMITIDAS }`
        })
    }
    switch (COLECCION) {
        case 'usuarios':
            buscarUsuarios(TERMINO, res);
        break;
        case 'categorias':
            buscarCategorias(TERMINO, res);
        break;
        case 'productos':
            buscarProductos(TERMINO, res);
        break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsquda'
            })
    }
}

module.exports = {
    BUSCAR
}