const { response } = require("express")

const VALIDAR_ARCHIVO_SUBIR = (req, res =response, next) => { 
    if (!req.file || Object.keys(req.file).length === 0 || !req.file.archivo) {
        return res.status(400).json({
            msg:'No hay archivos que subir-validarArchivoSubir'
        })        
    }
    next();
}

module.exports = {
    VALIDAR_ARCHIVO_SUBIR,
}