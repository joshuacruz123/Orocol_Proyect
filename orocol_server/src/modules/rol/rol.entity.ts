// rol.entity.ts
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolNombre } from './rol.enum';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity({ name: 'Rol' })
export class RolEntity {

  @PrimaryGeneratedColumn('increment')
  idRol: number;

  @Column({type: 'varchar', length: 15, nullable: false})
  tipoRol: RolNombre; 

  @OneToMany(() => UsuarioEntity, usuario => usuario.roles)
  @JoinColumn({ name: 'IdUsu_FK' })
  usuarios: UsuarioEntity[];
} 
 
/*
----------- Rol ----------------------------------
// ManyToMany,

@OneToMany(() => Usuario, usuario => usuario.rol)
  usuarios: Usuario[];

  @ManyToOne(() => Usuario, { eager: true }) // eager loading para cargar el usuario al recuperar un administrador
  @JoinColumn({ name: 'IdUs_FK' })
  Usuarios: Usuario; 
*/