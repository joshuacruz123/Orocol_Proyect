import { IsEmail, IsUrl, MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class PerfilDto {
 
    @IsNotBlank({message: 'La url no puede estar vacia'})
    @IsUrl()
    fotoPerfil: string;
} 