import { VentasInterface } from '../../core/interfaces/venta.interface';

export interface ComprasInterface {
    IdCliente: number;
    NombreCompleto: string;
    Empresa: string;
    Pais: string;
    CiudadMunicipio: string;
    FechaExportacion: Date;
    estadoCompra: string;
    salidaVentas: { 
        IdSalidaVenta: number;
        PesogrOro: number;
        entrada?: VentasInterface;
    };
}