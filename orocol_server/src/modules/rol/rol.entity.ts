// rol.entity.ts
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolNombre } from './rol.enum';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ name: 'Rol' })
export class Rol {

  @PrimaryGeneratedColumn('increment')
  idRol: number;

  @Column({type: 'varchar', length: 15, nullable: false, unique: true})
  tipoRol: RolNombre; 

  @OneToMany(() => Usuario, usuario => usuario.roles)
  @JoinColumn({ name: 'IdUsu_FK' })
  usuarios: Usuario[];
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