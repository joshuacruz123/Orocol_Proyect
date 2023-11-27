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

@Entity({ name: 'rol' })
export class Rol {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id_rol: number;

  @Column({
    type: 'enum',
    enum: TipoRol,
    nullable: false,
  })
  tipo_rol: TipoRol;

  @Column({
    type: 'enum',
    enum: EstadoRol,
    default: EstadoRol.ACTIVO,
  })
  estado_rol: EstadoRol;

  @OneToMany(() => Usuario, usuario => usuario.rol)
  usuarios: Usuario[];
}
 
