import Compra from '../models/compra.js';
import aumentarStock from '../controllers/aumentarStock.js';
import disminuirStock from '../controllers/disminuirStock.js';

    const compraPost = async (req,res) => {

     const {usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuesto, total, detalles}=req.body;
     const compra = new Compra({usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuesto, total, detalles})

    await compra.save();

    await detalles.map((articulo)=>  aumentarStock(articulo._id,articulo.cantidad))

    res.json({
        compra
    })
    }

    const compraGet = async (req,res)=>{
        const compra = await Compra
        .find()
        .populate('articulo','nombre')
        .populate('usuario','nombre')
        .populate('persona','nombre')
    
        res.json({
            compra
        })
    }

/*
    const compraGet = async (req, res = response) => {     
        const query = req.query.query;
        console.log(query);
        const compra = await compra
        .find({numComprobante: new RegExp(query,'i')})
            .populate('Usuario','nombre')
            .populate('Persona','nombre')
            .sort({'createdAt':-1})      
        res.json({ 
            compra
        })
    }
*/
    const compraGetById = async (req,res) => {
        const {id} = req.params;
    
        const compra = await Compra.findOne({_id:id});
    
        res.json ({
            compra
        })
    }
    
    const compraPut = async (req,res) => {
        const {id} = req.params
        const {_id,estado,createAt,__v,usuario,persona,...resto} = req.body;

        const compra = await Compra.findByIdAndUpdate (id, resto);

        res.json ({
            compra
        })
    }


    const compraActivar = async (req,res) => {
    // aumentarStock
    const {id} = req.params
    const compra = await Compra.findByIdAndUpdate(id,{estado:1});
     await compra.detalles.map((articulo)=>  aumentarStock(articulo._id,articulo.cantidad))

    res.json ({
        compra
    })
    }

    const compraDesactivar = async (req,res) => {
        // disminuirStock
        const {id} = req.params
        const compra = await Compra.findByIdAndUpdate(id,{estado:0});
        await compra.detalles.map((articulo)=>  disminuirStock(articulo._id,articulo.cantidad))
    
        res.json ({
            compra
        })
    }

export {compraPost, compraGet, compraGetById, compraActivar, compraDesactivar, compraPut} 
