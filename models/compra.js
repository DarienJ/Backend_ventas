import mongoose from "mongoose";

const compraSchema = new mongoose.Schema ({
    usuario: {type:mongoose.Schema.Types.ObjectId,ref:'usuario',required:true},
    persona: {type:mongoose.Schema.Types.ObjectId,ref:'Persona',required:true},
    tipoComprobante: {type:String, required:true, maxlenght:20},
    serieComprobante: {type:String, required:true, maxlenght:7},
    numComprobante: {type:String, required:true, maxlenght:10},
    impuesto: {type:Number, required:true},
    total: {type:Number, required:true},
    detalles: [{
        _id: {type:String, required:true},
        articulo: {type:String, required:true},
        cantidad: {type:Number, required:true},
        precio: {type:Number, required:true}
    }],
    estado: {type:Number, default:1,},
    createAT: {type:Date,default:Date.now,}
})

export default  mongoose.model('Compra',compraSchema);