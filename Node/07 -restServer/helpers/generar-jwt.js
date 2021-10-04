const JWT = require('jsonwebtoken');

const GENERAR_JWT = ( uid = '' ) => {
    return new Promise( (resolve, reject) => {
        const PAYLOAD = { uid };
        JWT.sign( PAYLOAD, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })
    })
}

module.exports = {
    GENERAR_JWT
}