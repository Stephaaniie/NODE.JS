const PATH = require('path');

const {RESPONSE} = require('express');

const CARGAR_ARCHIVO = (req, res = RESPONSE) =>{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.ARCHIVO) {
      res.status(400).json({msg:'No files were uploaded.'});
      return;
    }  
    const { ARCHIVO } = req.files;
    const UPLOAD_PATH = PATH.join(__dirname, '../uploads/', ARCHIVO.name);
    ARCHIVO.mv(UPLOAD_PATH, (err) => {
      if (err) {
        return res.status(500).json({err});
      }
      res.json({msg: 'File uploaded to ' + UPLOAD_PATH});
    });
}

module.exports = {
    CARGAR_ARCHIVO
}