import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class AdministradorDto {
    @IsNotBlank({ message: 'el cargo no puede estar vacío' })
    cargoAdmin?: string;

    nombreUsuario: string; 
    apellidosUsuario: string;
    correoUsuario: string;
    passwordUsuario: string;
}
