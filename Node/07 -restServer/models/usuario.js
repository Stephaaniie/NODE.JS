const { SCHEMA, MODEL } = require('mongoose');

const USUARIO_SCHEMA = SCHEMA({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, PASSWORD, ID, ...USUARIO  } = this.toObject();
    USUARIO.uid = _id;
    return USUARIO;
}

module.exports = MODEL( 'Usuario', USUARIO_SCHEMA );