import { ProductosInterface } from '../../core/interfaces/producto.interface';

export interface VentasInterface {
    idGestionVenta: number;
    fechaExtraccionOro: Date;
    precioOro: number;
    cantidad: number;
    estadoVenta: string;
    producto: ProductosInterface;
}