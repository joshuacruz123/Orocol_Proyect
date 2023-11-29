import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Minero } from './minero.entity'; 
import { UsuarioMetodos } from '../usuarios/usuarios_metodos.interface';

@Injectable()
export class NovedadService {}
