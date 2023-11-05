"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./models/model"));
//Importamos la clase server
const dotenv_1 = __importDefault(require("dotenv"));
//Configuramos dot.env para las variables de entorno
dotenv_1.default.config();
const server = new model_1.default();
//nueva instancia del servidor
server.listen();
