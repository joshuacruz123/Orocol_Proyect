import jsPDF from "jspdf";

export interface ReporteComprasInterface {
    IdCliente: number;
    NombreCompleto: string;
    Empresa: string;
    Pais: string;
    CiudadMunicipio: string;
    FechaExportacion: string;
    estadoCompra: string;
    salidaVentas: {
        PesogrOro: number;
        entrada: {
            producto: {
                TipoOro: string;
            }
        }
    };
    pdf: jsPDF;
}