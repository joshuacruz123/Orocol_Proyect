import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm'; 
import { InjectRepository } from '@nestjs/typeorm';
import { AdministradorDto } from '../../dto/administrador.dto';
import { Administrador } from './administrador.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { Rol } from './../rol/rol.entity';
import { Usuario } from '../usuario/usuario.entity';
import { MessageDto } from 'src/common/message.dto';
import { RolNombre } from '../rol/rol.enum';
import { CreateUsuarioDto } from 'src/dto/create-usuario.dto';

@Injectable()
export class AdministradorService extends UsuarioService {
  constructor(
    @InjectRepository(Administrador) private readonly administradorRepository: Repository<Administrador>,
    @InjectRepository(Rol) protected readonly rolRepository: Repository<Rol>,
    @InjectRepository(Usuario) protected readonly usuarioRepository: Repository<Usuario>,
    private readonly usuarioService: UsuarioService,
  ) {
    super(rolRepository, usuarioRepository);
  }      


    async consultarAdministradores(): Promise<Administrador[]> {
        const usuariosConRoles: Usuario[] = await this.consultarUsuarios(); 
        const administradoresConvertidos = usuariosConRoles.filter(
            usuario => usuario instanceof Administrador
        ) as unknown as Administrador[];
        if (!administradoresConvertidos.length) {
            throw new NotFoundException(new MessageDto('La lista de administradores está vacía'));
        }
        return administradoresConvertidos;
    }
    

    async consultarAdmin(idAdmin: number): Promise<Administrador> {
        const usuario: Usuario = await this.consultarUsuario(idAdmin);
        if (!usuario.roles.some((rol) => rol.tipoRol === RolNombre.ADMINISTRADOR)) {
            throw new NotFoundException(new MessageDto('El usuario no es un administrador'));
        }
        const administrador = await this.administradorRepository.findOne({ where: { idAdmin: usuario.idUsuario } });
        if (!administrador) {
            throw new NotFoundException(new MessageDto('No existe el administrador'));
        }
        return administrador;
    }


    async findByCargoAdmin(cargoAdmin: string): Promise<Administrador> {
        const administrador = await this.administradorRepository.findOne({ where: { cargoAdmin: cargoAdmin } });
        return administrador;
    }

    async registrarAdmin(dto: AdministradorDto ): Promise<any> {
        const exists = await this.findByCargoAdmin(dto.cargoAdmin);
        if (exists) throw new BadRequestException(new MessageDto('ese cargoAdmin ya existe'));
        const usuarioDto: CreateUsuarioDto = {
            nombreUsuario: dto.nombreUsuario,
            apellidosUsuario: dto.apellidosUsuario,
            correoUsuario: dto.correoUsuario,
            passwordUsuario: dto.passwordUsuario,
        };
        await this.usuarioService.registrarUsuario(usuarioDto);
        const administrador = this.administradorRepository.create(dto);
        await this.administradorRepository.save(administrador);
        return new MessageDto(`administrador ${administrador.cargoAdmin} creado`);
    }

    async editarAdmin(idAdmin: number, dto: AdministradorDto): Promise<any> {
        const administrador = await this.consultarAdmin(idAdmin);
        if (!administrador)
            throw new NotFoundException(new MessageDto('no existe'));
            await this.usuarioService.editarUsuario(idAdmin, {
                nombreUsuario: dto.nombreUsuario, apellidosUsuario: dto.apellidosUsuario, 
                correoUsuario: dto.correoUsuario, passwordUsuario: dto.passwordUsuario,
            });
        const exists = await this.findByCargoAdmin(dto.cargoAdmin);
        if (exists && exists.idAdmin !== idAdmin) throw new BadRequestException(new MessageDto('ese administrador ya existe'));
        dto.cargoAdmin ? administrador.cargoAdmin = dto.cargoAdmin : administrador.cargoAdmin = administrador.cargoAdmin;
        await this.administradorRepository.save(administrador);
        return new MessageDto(`administrador ${administrador.cargoAdmin} actualizado`);
    }
    // Método para 
}