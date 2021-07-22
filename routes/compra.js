import { Router } from "express";
import {compraPost, compraGet, compraGetById, compraActivar, compraDesactivar, compraPut} from '../controllers/compra.js'
import { validarJWT } from '../middlewares/validar_jwt.js';
import validarRoles from '../middlewares/validar-rol.js';
import {check} from 'express-validator';
import { validarCampos } from '../middlewares/validas-campos.js';
import existeCompraById from '../helpers/compra.js';

const router = Router();

router.get('/', [
    validarJWT,
    validarRoles('VENDEDOR_ROL', 'ADMIN_ROL'),
    validarCampos
],compraGet);

router.get('/:id', [
    validarJWT,
    validarRoles('VENDEDOR_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeCompraById),
    validarCampos
], compraGetById);

router.post('/', [
    validarJWT,
    validarRoles('VENDEDOR_ROL', 'ADMIN_ROL'),
    validarCampos,
], compraPost);

router.put('/activar/:id', [
    validarJWT,
    validarRoles('VENDEDOR_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeCompraById),
    validarCampos
], compraActivar);

router.put('/desactivar/:id', [
    validarJWT,
    validarRoles('VENDEDOR_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeCompraById),
    validarCampos
], compraDesactivar);

router.put('/:id', [
    validarJWT,
    validarRoles('VENDEDOR_ROL', 'ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeCompraById),
    validarCampos
], compraPut)

export default router;