import Usuario from '../models/usuario.js';
import bcryptjs from 'bcryptjs';
import {generarJWT} from '../middlewares/validar_jwt.js';

const usuarioControllers = {
    usuarioGet: async (req,res)=> {
        const query = req.query.value;
        const usuarios = await Usuario.find({

            $or: [
                {nombre: new RegExp(query, 'i')},
                {email: new RegExp(query, 'i')},
                {rol: new RegExp(query, 'i')}
            ]
            
        });

        res.json ({
            usuarios
        })
    },

    usuarioGetByid: async (req,res)=> {
        
        const {id} = req.params;
        const usuario = await Usuario.findById(id);

        res.json({
            usuario
        })
    },

    usuarioPost: async (req,res)=> {
        const {nombre,email,password,rol} = req.body;
        const usuario = Usuario({nombre,email,password,rol});

        const salt = bcryptjs.genSaltSync();
        usuario.password=bcryptjs.hashSync(password,salt);

        usuario.save();

        res.json({
            usuario
        })
    },
    
    login: async (req,res)=>{
        const {email,password}=req.body;

        const usuario = await Usuario.findOne({email})
        if (!usuario){
            return res.status(404).json({
                msg: 'Usuario/Password no encontrado "email"'
            })
        }
        if (usuario.estado === 0) {
            return res.status(404).json({
                msg: 'Usuario/Password no encontrado "estado"'
            })
        }
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword){
            return res.status(404).json({
                msg: 'Usuario/Password no encontrado "password"'
            })
        }

        const token = await generarJWT(usuario.id);

        res.json ({
            usuario,
            token
        });
    },

    usuarioPut: async (req,res)=> {
        const {id} = req.params;
        const {_id, email, createAt, estado, __v, rol, password, ...resto}=req.body;

        if(password){
            const salt = bcryptjs.genSaltSync();
        resto.password=bcryptjs.hashSync(password,salt);
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto);

        res.json({
            usuario
        })
    },

    usuarioPutActivar: async (req,res)=>  {
        const {id} = req.params;

        const usuario = await Usuario.findByIdAndUpdate(id, {estado:1});

        res.json({
            usuario
        })
    },

    usuarioPutDesactivar: async (req,res)=>  {
        const {id} = req.params;

        const usuario = await Usuario.findByIdAndUpdate(id, {estado:0});

        res.json({
            usuario
        })
    },

    usuarioDelete: async (req,res)=> {
        const {id} = req.params
        const usuario = await Usuario.findByIdAndDelete(id);
        
        res.json ({
            usuario
        })
    }
}

export default usuarioControllers;