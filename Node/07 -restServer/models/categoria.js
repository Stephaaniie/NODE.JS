const { SCHEMA, MODEL } = require('mongoose');

const CATEGORIA_SCHEMA = SCHEMA({
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
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});
CATEGORIA_SCHEMA.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}

module.exports = MODEL( 'Categoria', CATEGORIA_SCHEMA);