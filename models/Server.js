import express from 'express';
import cors from 'cors';
import dbConection from '../database/config.js';
import categoria from '../routes/categoria.js';
import usuario from '../routes/usuario.js';
import articulo from '../routes/articulo.js';
import compra from '../routes/compra.js';
import venta from '../routes/venta.js';
import persona from '../routes/persona.js';


class Server{
    constructor(){
        
        this.port= process.env.PORT

        this.app = express();

        this.conectarBD();

        this.middlewares();

        this.routes();
    }

    routes(){
        this.app.use('/api/categoria',categoria);
        this.app.use('/api/usuario',  usuario);
        this.app.use('/api/articulo', articulo);     
        this.app.use('/api/compra', compra);
        this.app.use('/api/venta', venta);
        this.app.use('/api/persona', persona);
    }

    async conectarBD(){
      await dbConection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}

export default Server;



