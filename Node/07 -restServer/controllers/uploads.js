const {RESPONSE} = require('express');

const { UPLOAD_FILE } = require('../helpers');

const CARGAR_ARCHIVO = async(req, res = RESPONSE) =>{ 
    
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.ARCHIVO) {
    res.status(400).json({msg:'No files were uploaded.'});
    return;
  } 
  try {
    const NOMBRE = await UPLOAD_FILE(req.files, ['csv','md'],'textos');
    const NOMBRE = await UPLOAD_FILE(req.files, undefined, 'imgs');
    res.json({NOMBRE});
  } catch (msg) {
    res.status(400).json({msg});
  }
}

module.exports = {
  CARGAR_ARCHIVO
}