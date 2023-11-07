import express, { Application } from 'express';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000'
    }
    //En el puerto 6000 o 4000 
    //node ts dist/index.js
    //nodemon dist/index.js

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto', this.port);
        })
    }
    //Función para correr express
}

export default Server;
// clase para hacer correr el servidor