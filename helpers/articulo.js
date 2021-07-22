import Articulo from '../models/articulo.js'

const existeArticuloById = async (req,res)=> {
    const existe = await Articulo.findById(id);

    if (!existe) throw new Error (`El ID no existe`);

}

const existeArticuloByNombre = async (req,res) => {
    const existe = await Articulo.findOne({nombre});
    if (existe) throw new Error (`Ya existe un articulo con ese nombre `);
}

export {existeArticuloById, existeArticuloByNombre}