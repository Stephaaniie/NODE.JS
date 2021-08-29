const {Schema, model} = require('mongoose');

const USUARIO_SCHEMA = Schema({
    nombre:{
        type:String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    contrasenia:{
        type:String,
        required: [true, 'La contraseña es obligatorio']
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required:true,
        enum: ['ADMIN_ROL', 'USER_ROL']
    },
    estado:{
        type:Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default: false
    }
});

USUARIO_SCHEMA.methods.toJson = function () {
    const{
        __v, contrasenia, ...usuario
    } = this.toObject();
    usuario.usuarioId = _id;
    return usuario; 
}

module.exports = model('Usuario',USUARIO_SCHEMA);