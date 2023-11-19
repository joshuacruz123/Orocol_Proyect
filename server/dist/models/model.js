"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../routes/routes"));
const connection_1 = __importDefault(require("../db/connection"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '4000';
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
        });
    }
    //Función para correr express
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default);
        // Dependencia Cors para comunicar servidores
    }
    //Funsion para parseo del body
    routes() {
        this.app.use('/api/route', routes_1.default);
    }
    conexionDB() {
        connection_1.default.connect((err) => {
            if (err)
                throw err;
            console.log('Conexión exitosa!');
        });
    }
}
exports.default = Server;
// clase para hacer correr el servidor
