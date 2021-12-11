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

const ACTUALIZAR_IMAGEN = async(req, res = response) =>{
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
    const PATH_IMAGEN = PATH.join(__dirname,'../uploads', coleccion, modelo.img);
    if (FILE_SYSTEM.existsSync(PATH_IMAGEN)) {
      FILE_SYSTEM.unlinkSync(PATH_IMAGEN);  
    }
  }
  const NOMBRE = await subirArchivo(req.file, undefined, coleccion);
  modelo.img = NOMBRE;
  await modelo.save();
  res.json({modelo})
}


module.exports = {
  CARGAR_ARCHIVO,
  ACTUALIZAR_IMAGEN
}