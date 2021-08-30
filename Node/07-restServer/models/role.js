const {Schema, model} = require ('mongoose');

const ROLE_SCHEMA = Schema ({
    rol:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

module.exports = model('role',ROLE_SCHEMA);