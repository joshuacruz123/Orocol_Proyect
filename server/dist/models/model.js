"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../routes/routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '4000';
        this.routes();
    }
    //En el puerto 6000 o 4000 
    //tsc --watch
    //nodemon dist/index.js
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto', this.port);
        });
    }
    //Función para correr express
    routes() {
        this.app.use('/api/route', routes_1.default);
    }
}
exports.default = Server;
// clase para hacer correr el servidor
