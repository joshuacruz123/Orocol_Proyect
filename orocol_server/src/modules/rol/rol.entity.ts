// rol.entity.ts
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolNombre } from './rol.enum';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ name: 'Rol' })
export class Rol {

  @PrimaryGeneratedColumn('increment')
  idRol: number;

  @Column({type: 'varchar', length: 15, nullable: false, unique: true})
  tipoRol: RolNombre; 

  @ManyToMany(type => Usuario, usuario => usuario.roles)
  usuarios: Usuario[];
}
 