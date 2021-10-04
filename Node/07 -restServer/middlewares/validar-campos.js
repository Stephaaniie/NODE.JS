const { VALIDATION_RESULT } = require('express-validator');

const VALIDAR_CAMPOS = ( req, res, next ) => {
    const ERRORS = VALIDATION_RESULT(req);
    if( !ERRORS.isEmpty() ){
        return res.status(400).json(ERRORS);
    }
    next();
}

module.exports = {
    VALIDAR_CAMPOS
}