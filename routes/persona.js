import {Router} from 'express';
import personaControllers from '../controllers/persona.js';
import validarRoles from '../middlewares/validar-rol.js';
import { validarJWT } from '../middlewares/validar_jwt.js';
import { validarCampos } from '../middlewares/validas-campos.js';
import {check} from 'express-validator';
import existePersonaID from '../helpers/persona.js';

const router = Router();

router.get ('/',[
    validarJWT,
    validarRoles('ADMIN_ROL', 'VENDEDOR_ROL'),
    validarCampos
], personaControllers.personaGet);

router.get ('/cliente',[
    validarJWT,
    validarRoles('ADMIN_ROL', 'VENDEDOR_ROL'),
    validarCampos
], personaControllers.personaGetCliente);

router.get ('/proveedor',[
    validarJWT,
    validarRoles('ADMIN_ROL', 'VENDEDOR_ROL'),
    validarCampos
], personaControllers.personaGetProveedores);

router.get ('/:id',[
    validarJWT,
    validarRoles('ADMIN_ROL', 'VENDEDOR_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existePersonaID),
    validarCampos
], personaControllers.personaGetByid);

router.post ('/',[
    validarJWT,
    validarRoles('ADMIN_ROL', 'VENDEDOR_ROL'),
    validarCampos
],personaControllers.personaPost);

router.put ('/:id',[
    validarJWT,
    validarRoles('ADMIN_ROL', 'VENDEDOR_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existePersonaID),
    validarCampos
], personaControllers.personaPut);

router.put ('/Activar/:id',[
    validarJWT,
    validarRoles('ADMIN_ROL', 'VENDEDOR_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existePersonaID),
    validarCampos
], personaControllers.personaPutActivar);

router.put ('/Desactivar/:id',[
    validarJWT,
    validarRoles('ADMIN_ROL', 'VENDEDOR_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check ('id').custom(existePersonaID),
    validarCampos
], personaControllers.personaDesactivar);

export default router;