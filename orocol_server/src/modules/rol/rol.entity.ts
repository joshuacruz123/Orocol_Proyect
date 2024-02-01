// rol.entity.ts
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RolNombre } from './rol.enum';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity({ name: 'Rol' })
export class RolEntity {

  @PrimaryGeneratedColumn('increment')
  idRol: number;

  @Column({type: 'varchar', length: 15, nullable: false})
  tipoRol: RolNombre; 

  @OneToMany(() => UsuarioEntity, (usuario) => usuario.roles)
  usuario: UsuarioEntity[];
} 