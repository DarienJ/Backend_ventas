import mongoose from "mongoose";

const PersonaSchema = mongoose.Schema ({
tipoPersona : {type:String, maxlenght:50},
nombre: {type:String, required:true, maxlenght:50, unique:true},
tipoDocumento: {type:String, required:true, maxlenght:20},
numDocumento: {type:String, required:true, maxlenght:20, unique:true},
direccion: {type:String, required:true, maxlenght:70},
telefono: {type:String, required:true, maxlenght:15},
email: {type:String, required:true, maxlenght:50, unique:true},
estado: {type:Number, default:1,},
createAT: {type:Date,default:Date.now,}
})

export default mongoose.model('Persona', PersonaSchema);