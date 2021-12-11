const { SCHEMA, MODEL } = require('mongoose');

const PRODUCTO_SCHEMA = SCHEMA({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: SCHEMA.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: SCHEMA.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, defult: true },
    img: {type:String},
});

PRODUCTO_SCHEMA.methods.toJSON = function() {
    const { __v, ESTADO, ...DATA  } = this.toObject();
    return DATA;
}

module.exports = MODEL( 'Producto', PRODUCTO_SCHEMA );