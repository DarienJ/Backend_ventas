import { Router } from "express";
import {ventaPost, ventaGet, ventaGetById, ventaActivar, ventaDesactivar, ventaPut } from '../controllers/venta.js'
import { validarJWT } from '../middlewares/validar_jwt.js';
import validarRoles from '../middlewares/validar-rol.js';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validas-campos.js';
import existeVentaById from '../helpers/venta.js';

const router = Router();

router.get('/', [
    validarJWT,
    validarRoles('VENDEDOR_ROL', 'ADMIN_ROL'),
    validarCampos
], ventaGet);

router.get('/:id', [
    validarJWT,
    validarRoles('VENDEDOR_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeVentaById),
    validarCampos
], ventaGetById);

router.post('/', [
    validarJWT,
    validarRoles('VENDEDOR_ROL', 'ADMIN_ROL'),
    validarCampos
], ventaPost);

router.put('/activar/:id', [
    validarJWT,
    validarRoles('VENDEDOR_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeVentaById),
    validarCampos
], ventaActivar);

router.put('/desactivar/:id', [
    validarJWT,
    validarRoles('VENDEDOR_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeVentaById),
    validarCampos
], ventaDesactivar);

router.put('/:id', [
    validarJWT,
    validarRoles('VENDEDOR_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeVentaById),
    validarCampos
], ventaPut)
export default router;