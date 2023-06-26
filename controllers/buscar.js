const collecionesPermitidas = ['usuarios', 'productos', 'categorias', 'roles'];
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const buscarUsuarios = async (termino, res) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, 'i');

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });
  res.json({
    results: usuarios,
  });
};

const buscarProductos = async (termino, res) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const producto = await Producto.findById(termino).populate(
      'categoria',
      'nombre'
    );
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, 'i');

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  }).populate('categoria', 'nombre');
  res.json({
    results: productos,
  });
};

const buscarCategorias = async (termino, res) => {
  const esMongoID = ObjectId.isValid(termino);
  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, 'i');

  const categorias = await Categoria.find({ nombre: regex, estado: true });
  res.json({
    results: categorias,
  });
};

const buscar = (req, res) => {
  const { collecion, termino } = req.params;

  if (!collecionesPermitidas.includes(collecion)) {
    return res.status(400).json({
      msg: `Las colleciones permitidas son: ${collecionesPermitidas}`,
    });
  }

  switch (collecion) {
    case 'usuarios':
      buscarUsuarios(termino, res);
      break;
    case 'productos':
      buscarProductos(termino, res);
      break;
    case 'categorias':
      buscarCategorias(termino, res);
      break;
    default:
      res.status(500).json({
        msg: 'Se me olvido hacer esta busqueda',
      });
  }
};

module.exports = {
  buscar,
};
