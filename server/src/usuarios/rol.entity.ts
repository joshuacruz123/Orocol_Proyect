// rol.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Usuario } from './usuarios.entity';

enum TipoRol {
  MINERO = 'Minero',
  ADMINISTRADOR = 'Administrador',
}

enum EstadoRol {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity({ name: 'Rol' })
export class Rol {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  idRol: number;

  @Column({
    type: 'enum',
    enum: TipoRol,
    nullable: false,
  })
  tipoRol: TipoRol;

  @Column({
    type: 'enum',
    enum: EstadoRol,
    default: EstadoRol.ACTIVO,
  })
  estadoRol: EstadoRol;

  @OneToMany(() => Usuario, usuario => usuario.rol)
  usuarios: Usuario[];
}
 
