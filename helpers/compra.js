import Compra from '../models/compra.js';

const existeCompraById = async ()=>{
    const existe = await Compra.findById(id);

    if (!existe) throw new Error (`El ID no existe`);
}

export default existeCompraById;