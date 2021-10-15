const PATH = require('path');

const {V4: uuidv4} = require('uuid');

const UPLOAD_FILE = (files,extensionesValidas = ['txt','png','jpn','gif'], folder = '') => {

    return new Promise((resolve, reject) => {
        
        const { ARCHIVO } = files;

        const NOMBRE_TEMPORAL = uuidv4() + '.' + EXTENSION;

        const UPLOAD_PATH = PATH.join(__dirname, '../uploads/',folder, NOMBRE_TEMPORAL);

        const NOMBRE_CORTADO = ARCHIVO.name.split('.');

        const EXTENSION = NOMBRE_CORTADO[NOMBRE_CORTADO.length - 1];

        if(!extensionesValidas.includes(EXTENSION)){ return reject( `La extensión ${EXTENSION} NO ES PERMITIDA, ${EXTENSIONES_VALIDAS}`);}

        ARCHIVO.mv(UPLOAD_PATH, (err) => {
          if (err) { reject(err);}

          resolve(UPLOAD_PATH);
        });
    });
    
}

module.exports = {
    UPLOAD_FILE
}