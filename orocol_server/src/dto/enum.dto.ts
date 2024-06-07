import { EstadoUsuario } from 'src/enums/usuario.enum';
import { IsEnum } from 'class-validator';
import { EstadoProducto } from 'src/enums/producto.enum';
import { EstadoVenta } from 'src/enums/venta.enum';
import { EstadoCompra } from 'src/enums/cliente.enum';

export class InactivarUsuarioDto {
    @IsEnum(EstadoUsuario)
    estadoUsuario: EstadoUsuario;
}

export class ActivarUsuarioDto {
    @IsEnum(EstadoUsuario)
    estadoUsuario: EstadoUsuario;
} 

export class EstadoProductoDto {
    @IsEnum(EstadoProducto)
    estadoProducto: EstadoProducto;
}

export class EstadoVentaDto {
    @IsEnum(EstadoVenta)
    estadoVenta: EstadoVenta;
}

export class EstadoCompraDto {
    @IsEnum(EstadoCompra)
    estadoCompra: EstadoCompra;
}