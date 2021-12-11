const PATH = require('path');

const FILE_SYSTEM = require('fs');

const CLOUDINARY = require('cloudinary').v2;

CLOUDINARY.config(process.example.CLOUDINARY_URL);

const {RESPONSE} = require('express');

const { UPLOAD_FILE } = require('../helpers');

const {USUARIO, PRODUCTO} = require('../models');

const USUARIOS = 'usuarios';

const CARGAR_ARCHIVO = async(req, res = RESPONSE) =>{ 
  try {
    const NOMBRE = await UPLOAD_FILE(req.files, ['csv','md'],'textos');
    const NOMBRE = await UPLOAD_FILE(req.files, undefined, 'imgs');
    res.json({NOMBRE});
  } catch (msg) {
    res.status(400).json({msg});
  }
}

const ACTUALIZAR_IMAGEN_CLOUDINARY = async(req, res = response) =>{
  const{id, colection} = req.params;
  let modelo = '';
  switch (coleccion) {
    case USUARIOS:
      modelo = await USUARIO.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el ${id}`
        })
      }
      break;
    case PRODUCTO:
      modelo = await PRODUCTO.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con el ${id}`
        })
      }
      break;
    default:
      return res.status(500).json({ msg: 'Se me olvido validar'});
  }
  if (modelo.img) {
    const NOMBRE_ARREGLO = modelo.img.split('/');
    const NOMBRE = NOMBRE_ARREGLO[NOMBRE_ARREGLO.length -1];
    const PUBLIC_ID = NOMBRE.split('.');
    CLOUDINARY.uploader.destroy(PUBLIC_ID);
  }
  const {TEMP_FILE_PATH} = req.file.subirArchivo;
  const {SECURE_URL} = await CLOUDINARY.uploader.upload(TEMP_FILE_PATH);
  modelo.img = SECURE_URL;
  await modelo.save();
  res.json({modelo})
}

module.exports = {
  CARGAR_ARCHIVO,
  ACTUALIZAR_IMAGEN_CLOUDINARY
}