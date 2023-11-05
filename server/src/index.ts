import Server from "./models/model";
//Importamos la clase server
import dotenv from 'dotenv';

//Configuramos dot.env para las variables de entorno
dotenv.config();

const server = new Server()
//nueva instancia del servidor

server.listen();