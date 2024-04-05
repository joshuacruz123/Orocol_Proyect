export class Ventas {
    idGestionVenta?: number;
    fechaExtraccionOro: Date;
    precioOro: number;
    cantidad: number;
    estadoVenta?: string;

    constructor(fechaExtraccionOro: Date, precioOro: number, cantidad: number, estadoVenta?:string) {
        this.fechaExtraccionOro = fechaExtraccionOro;
        this.precioOro = precioOro;
        this.cantidad = cantidad;
        this.estadoVenta = estadoVenta;
    }
}