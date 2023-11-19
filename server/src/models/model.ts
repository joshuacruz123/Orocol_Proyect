import express, { Application } from 'express';
import rutas from '../routes/routes';
import connection from '../db/connection';
import cors from 'cors';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000'
        this.middlewares();
        this.routes();
        this.conexionDB();
    }
    //En el puerto 6000 o 4000 
    /* {
    "nombreUsuario": "Estupido tonto",
    "apellidosUsuario": "Cruz Fierro",
    "correoUsuario": "shfksdfj@gmail.com",
    "passwordUsuario": "wfjsfw4nfs"
    }
    */
    //tsc --watch
    //nodemon dist/index.js

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto', this.port);
        })
    }
    //Función para correr express

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors);
        // Dependencia Cors para comunicar servidores
    }
    //Funsion para parseo del body


    routes() {
        this.app.use('/api/route', rutas);
    }

    conexionDB() {
        connection.connect((err) => {
            if(err) throw err;
            console.log('Conexión exitosa!')
        })
    }
}

export default Server;
// clase para hacer correr el servidor