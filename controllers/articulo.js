import Articulo from '../models/articulo.js';

const articuloControllers = {

    articuloGet: async (req,res)=>{
        const articulos = await Articulo
        .find()
        .populate('categoria','nombre')
    
        res.json({
            articulos
        })
    },
    
    articuloById: async (req,res) => {
        const {id} = req.params;
    
        const articulo = await Articulo.findOne({_id:id});
    
        res.json ({
            articulo
        })
    },
    
    articuloPost: async (req,res) =>{
        const {codigo, categoria, nombre, descripcion, precio, stock} = req.body;
    
        const articulo = new Articulo({codigo, categoria, nombre, descripcion, precio, stock});
    
        await articulo.save();
    
        res.json({
            articulo
        });
    },
    
    articuloPut: async (req,res)=>{
        const {id} = req.params
        const {_id,estado,createAt,__v,...resto} = req.body;

        const articulo = await Articulo.findOneAndUpdate (id, resto);

        res.json ({
            articulo
        })
    },
    
    articuloPutActivar: async (req,res) => {
        const {id} = req.params
        const articulo = await Articulo.findByIdAndUpdate(id,{estado:1});

        res.json ({
            articulo
        })
    },
    
    articuloPutDesactivar: async (req,res) => {
        const {id} = req.params
        const articulo = await Articulo.findByIdAndUpdate(id,{estado:0});

        res.json ({
            articulo
        })
    },
    
    articuloDelete: async (req,res) => {
        const {id} = req.params
        const articulo = await Articulo.findByIdAndDelete(id);
        
        res.json ({
            articulo
        })
    },
}

export default articuloControllers;