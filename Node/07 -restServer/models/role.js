const { SCHEMA, MODEL } = require('mongoose');

const ROLE_SCHEMA = SCHEMA({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

module.exports = MODEL( 'Role', ROLE_SCHEMA );