import Articulo from '../models/articulo.js'

const disminuirStock = async (_id, cantidad) =>{
    let {stock} = await Articulo.findById(_id);
    stock = parseInt(stock) - parseInt(cantidad);
    await Articulo.findByIdAndUpdate({_id},{stock});
}

 export default disminuirStock;