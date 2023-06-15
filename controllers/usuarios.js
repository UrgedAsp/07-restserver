const { response } = require('express');

const usuariosGet = (req, res = response) => {
  const { test, random } = req.query;
  res.json({
    message: 'get API - controlador',
    test,
    random,
  });
};

const usuariosPut = (req, res) => {
  const id = req.params.id;
  res.json({
    message: 'put API - controlador',
    id,
  });
};
const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;
  res.json({
    message: 'post API - controlador',
    nombre,
    edad,
  });
};
const usuariosDelete = (req, res) => {
  res.json({
    message: 'delete API - controlador',
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
