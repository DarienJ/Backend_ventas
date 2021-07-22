import { Router } from "express";
import articuloControllers from "../controllers/articulo.js";
import { validarJWT } from '../middlewares/validar_jwt.js';
import validarRoles from '../middlewares/validar-rol.js';
import { validarCampos } from '../middlewares/validas-campos.js';
import { existeArticuloById, existeArticuloByNombre } from "../helpers/articulo.js";
import {check} from 'express-validator';

const router = Router();

router.get('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL', 'ADMIN_ROL'),
    validarCampos
], articuloControllers.articuloGet);

router.get('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeArticuloById),
    validarCampos
], articuloControllers.articuloById);

router.post('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL', 'ADMIN_ROL'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(existeArticuloByNombre),
    validarCampos
], articuloControllers.articuloPost);

router.put('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeArticuloById),
    check('nombre').custom(existeArticuloByNombre),
    validarCampos
], articuloControllers.articuloPut);

router.put('/activar/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeArticuloById),
    validarCampos
], articuloControllers.articuloPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeArticuloById),
    validarCampos
], articuloControllers.articuloPutDesactivar);

router.delete('/:id', [
    validarJWT,
    validarRoles('ALMACENISTA_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeArticuloById),
    validarCampos 
], articuloControllers.articuloDelete);

export default router;