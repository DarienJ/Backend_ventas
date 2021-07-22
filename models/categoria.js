import mongoose from "mongoose";

const CategoraSchema = mongoose.Schema ({
    nombre: {type:String,required:true,maxlenght:50,unique:true},
    descripcion: {type:String,maxlenght:255},
    estado: {type:Number, default:1,},
    createAT: {type:Date,default:Date.now,}
})

export default mongoose.model('Categoria',CategoraSchema);