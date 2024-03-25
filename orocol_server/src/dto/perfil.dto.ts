import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PerfilDto {
    @ApiProperty({ type: 'string', format: 'binary' }) // Indicar que se espera un archivo binario
    @IsNotEmpty() // Asegurarse de que el campo no esté vacío
    fotoPerfil: any; // Cambiar el tipo a 'any' para aceptar archivos binarios
}
