import Persona from '../models/persona.js';
//import persona from '../models/persona.js';

const personaControllers = {
    personaGet: async (req, res)=>{
        const value = req.query.value;

        const Persona = await persona
        .find({
            $or:[
                {nombre: new RegExp(value, 'i')},
                {email: new RegExp(value, 'i')},
                {numDocumento: new RegExp(value, 'i')}
                
            ]
        })
        .sort({'nombre': -1});
        res.json({
            Persona
        })
    },

    personaGetCliente: async (req,res) => {
        const value = req.query.value;
        const persona = await Persona.find ({tipoPersona: 'cliente',$or:[

                {nombre: new RegExp(value, 'i')},
                {numDocumento: new RegExp(value, 'i')},
                {telefono: new RegExp(value, 'i')},
                {email: new RegExp(value, 'i')}

        ]}, {})
        .sort({'createdAT': -1})
        res.json({persona})
    },

    personaGetProveedores: async (req,res) => {
        const value = req.query.value;
        const persona = await Persona.find ({tipoPersona: 'proveedor',$or:[

                {nombre: new RegExp(value, 'i')},
                {numDocumento: new RegExp(value, 'i')},
                {telefono: new RegExp(value, 'i')},
                {email: new RegExp(value, 'i')}

        ]}, {})
        .sort({'createdAT': -1})
        res.json({persona})
    },

    personaGetByid: async (req,res)=> {
    
        const {id} = req.params;
    
        const Persona = await persona.findOne({_id:id})
    
        res.json({
            Persona
        })
    },

    personaPost: async (req, res)=>{
        const {nombre, tipoDocumento, numDocumento, direccion, telefono, email, tipoPersona} = req.body; 
        const Persona = new persona ({nombre, tipoDocumento, numDocumento, direccion, telefono,tipoPersona, email});

        await Persona.save(); 

        res.json({
            Persona
        });

    },

    personaPut: async (req, res)=>{
        const {id} = req.params
        const {_id,estado,createAt,__v,numDocumento,email,tipoPersona,tipoDocumento,...resto} = req.body;

        const Persona = await persona.findByIdAndUpdate(id, resto);  

        res.json ({
            Persona
        })
    },

    personaPutActivar: async (req, res)=>{
        const {id} = req.params
        const Persona = await persona.findByIdAndUpdate(id,{estado:1});

        res.json ({
            Persona
        })
    },

    personaDesactivar: async (req, res)=>{
        const {id} = req.params
        const Persona = await persona.findByIdAndUpdate(id,{estado:0});

        res.json ({
            Persona
        })
    }

}

export default personaControllers;
