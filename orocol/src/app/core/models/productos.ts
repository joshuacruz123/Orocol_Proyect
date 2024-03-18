export class Productos {
    IdProducto?: number;
    TipoOro: string;
    estadoProducto?: string;

    constructor(TipoOro: string, estadoProducto?:string) {
        this.TipoOro = TipoOro;
        this.estadoProducto = estadoProducto;
    }
} 
 