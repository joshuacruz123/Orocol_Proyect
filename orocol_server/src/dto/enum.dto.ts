import { EstadoUsuario } from 'src/modules/usuario/usuario.enum';
import { IsEnum } from 'class-validator';
import { EstadoProducto } from 'src/modules/producto/producto.enum';
import { EstadoVenta } from 'src/modules/venta/venta.enum';
import { EstadoCompra } from 'src/modules/compra/cliente.enum';

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
    estadoUsuario: EstadoProducto;
}

export class EstadoVentaDto {
    @IsEnum(EstadoVenta)
    estadoVenta: EstadoVenta;
}

export class EstadoCompraDto {
    @IsEnum(EstadoCompra)
    estadoCompra: EstadoCompra;
}