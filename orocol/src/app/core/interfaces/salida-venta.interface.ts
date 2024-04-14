import { VentasInterface } from '../../core/interfaces/venta.interface';

export interface SalidaVentasInterface {
    IdSalidaVenta: number;
    PesogrOro: number;
    entrada: VentasInterface;
}