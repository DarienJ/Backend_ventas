import mongoose from 'mongoose';

const UsuarioSchema = mongoose.Schema({
    nombre: {type:String,required:true,maxlenght:50},
    email: {type:String,uniqued:true,maxlenght:50},
    password: {type:String,required:true},
    rol:{type:String,required:true,maxlenght:20},
    estado: {type:Number,default:1,required:true,maxlenght:50},
    createAt: {type:Date, default:Date.now}

})

export default mongoose.model('usuario',UsuarioSchema);