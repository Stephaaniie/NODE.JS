const DB_VALIDATOR = require('./db-validators');

const GENERAR_JWT = require('./generar-jwt');

const GOOGLE_VERIFY = require('./google-verify');

const UPLOAD_FILE = require('./upload-file');

module.exports = {
    ...DB_VALIDATOR,
    ...GENERAR_JWT,
    ...GOOGLE_VERIFY,
    ...UPLOAD_FILE
}