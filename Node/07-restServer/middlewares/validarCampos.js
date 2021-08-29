const { validationResult } = require('express-validator');

const VALIDAR_CAMPOS = (req, res, next) => {

    const ERRORS =validationResult(req);
    
    if(!ERRORS.isEmpty()){
        return res.status(400).json(ERRORS);
    }
    next();
}
module.exports = {
    VALIDAR_CAMPOS
}