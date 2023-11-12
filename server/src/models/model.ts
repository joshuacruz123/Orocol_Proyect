import express, { Application } from 'express';
import rutas from '../routes/routes';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000'
        this.routes();
    }
    //En el puerto 6000 o 4000 
    //tsc --watch
    //nodemon dist/index.js

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto', this.port);
        })
    }
    //Función para correr express

    routes() {
        this.app.use('/api/route', rutas);
    }
}

export default Server;
// clase para hacer correr el servidor