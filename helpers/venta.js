import Venta from '../models/venta.js';

const existeVentaById = async ()=>{
    const existe = await Venta.findById(id);

    if (!existe) throw new Error (`El ID no existe`);
}

export default existeVentaById;