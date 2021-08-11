import persona from '../models/persona.js'

const existePersonaID = async (req, res)=>{
    const existe = await persona.findById(id);

    if (!existe) throw new Error (`El ID no exsiste`);
}

export default existePersonaID;