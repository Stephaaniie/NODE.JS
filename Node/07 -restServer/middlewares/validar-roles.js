const { RESPONSE } = require('express')

const ES_ADMIN_ROLE = ( req, res = RESPONSE, next ) => {
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    const { ROL, NOMBRE } = req.usuario;
    if ( ROL !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ NOMBRE } no es administrador - No puede hacer esto`
        });
    }
    next();
}

const TIENE_ROLE = ( ...roles  ) => {
    return (req, res = RESPONSE, next) => {
        
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }
        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
        next();
    }
}

module.exports = {
    ES_ADMIN_ROLE,
    TIENE_ROLE
}