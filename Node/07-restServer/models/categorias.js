const {Schema, model} = require ('mongoose');

const CATEGORIA_SCHEMA = Schema ({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required:true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    }
});

module.exports = model('Categoria',CATEGORIA_SCHEMA);