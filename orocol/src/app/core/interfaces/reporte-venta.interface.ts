export interface ReporteVentasInterface {
    // idGestionVenta: number;
    fechaExtraccionOro: Date;
    precioOro: number;
    cantidad: number;
    estadoVenta: string;
    minero: {
        //IdMinero?: number;
        tipo_documento: string;
        numero_documento: number;
        telefono: number;
        usuario: {
            //idUsuario?: number;
            nombreUsuario: string;
            apellidosUsuario: string;
            correoUsuario: string;
        }
    }
    producto: {
        //IdProducto: number;
        TipoOro: string;
    };
    salida: {
        //IdSalidaVenta: 1;
        PesogrOro: number;
    };
}