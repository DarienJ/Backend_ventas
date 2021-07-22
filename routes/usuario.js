import {Router} from 'express';
import {check} from 'express-validator';
import usuarioControllers from '../controllers/usuario.js';
import { validarJWT } from '../middlewares/validar_jwt.js';
import validarRoles from '../middlewares/validar-rol.js';
import { validarCampos } from '../middlewares/validas-campos.js';
import existeUsuarioByID from '../helpers/usuarios.js';

const router = Router();

router.get('/',[
    validarJWT,
    validarRoles('ADMIN_ROL'),
    validarCampos
],usuarioControllers.usuarioGet);

router.get('/:id',[
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeUsuarioByID),
    validarCampos
],usuarioControllers.usuarioGetByid);

router.post('/',[
    validarJWT,
    validarRoles('ADMIN_ROL'),
    validarCampos
],usuarioControllers.usuarioPost);

router.post('/login',usuarioControllers.login);

router.put('/:id',[
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeUsuarioByID),
    validarCampos
],usuarioControllers.usuarioPut);

router.put('/activar/:id',[
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeUsuarioByID),
    validarCampos
],usuarioControllers.usuarioPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeUsuarioByID),
    validarCampos
],usuarioControllers.usuarioPutDesactivar);

router.delete('/:id', [
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existeUsuarioByID),
    validarCampos
], usuarioControllers.usuarioDelete);

export default router;