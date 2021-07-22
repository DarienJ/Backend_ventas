import {Router} from 'express';
import categoriasControllers from '../controllers/categoria.js';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validas-campos.js';
import { existeCategoriaById,existeCategoriaByNombre } from '../helpers/categorias.js';
import { validarJWT } from '../middlewares/validar_jwt.js';
import validarRoles from '../middlewares/validar-rol.js';

const router = Router();

router.get('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL', 'ADMIN_ROL'),
    validarCampos
],categoriasControllers.categoriaGet);

router.get('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeCategoriaById),
    validarCampos
],categoriasControllers.categoriaGetByid);

router.post('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL', 'ADMIN_ROL'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos
],categoriasControllers.categoriaPost);

router.put('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeCategoriaById),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos
],categoriasControllers.categoriaPut);

router.put('/activar/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeCategoriaById),
    validarCampos
],categoriasControllers.catgoriaPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeCategoriaById),
    validarCampos
],categoriasControllers.catgoriaPutDesactivar);

router.delete('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeCategoriaById),
    validarCampos
],categoriasControllers.catgoriaDelete);

export default router;