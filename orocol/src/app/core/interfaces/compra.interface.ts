import { SalidaVentasInterface } from '../../core/interfaces/salida-venta.interface';

export interface ComprasInterface {
    IdCliente: number;
    NombreCompleto: string;
    Empresa: string;
    Pais: string;
    CiudadMunicipio: string;
    FechaExportacion: Date;
    estadoCompra: string;
    salidaVentas: SalidaVentasInterface;
}