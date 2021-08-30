const JWT = require('jsonwebtoken');
const user = require('../models/user');

const GENERAR_JWT = async (userId = '') => {
    return new Promise ((resolve, reject) =>{
        const PAYLOAD = {userId};
        JWT.sign(PAYLOAD,process.env.SECRETO_PRIVADO_TOKEN, {
            expireIn: '30m'
        },(err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar TOKEN');
            } else {
                resolve(token);
            }
        })
    });
}

module.exports = {
    GENERAR_JWT
}