const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, tieneRole } = require('../middlewares');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');

const router = Router();

// Obtener todas las Productos - publico
router.get('/', obtenerProductos);

//Obtener una Producto por id - publico
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProducto);

// Crear Producto - privado - cualquier persona con un token valido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

// Actualizar - privado - cualquier persona con un token valido
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], actualizarProducto);

// Borrar una Producto - Admin
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], borrarProducto);

module.exports = router;
