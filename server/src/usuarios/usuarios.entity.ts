// usuario.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne } from 'typeorm';
import { Rol } from './rol.entity';
import { Administrador } from '../administrador/administrador.entity'; // Importa la entidad Administrador

enum EstadoUsuario {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo', 
}
 
@Entity({ name: 'Usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  idUsuario: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nombreUsuario: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  apellidosUsuario: string;
 
  @Column({ type: 'varchar', length: 255, unsigned: true, nullable: false })
  correoUsuario: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  passwordUsuario: string;

  @Column({
    type: 'enum',
    enum: EstadoUsuario,
    default: EstadoUsuario.ACTIVO,
  })
  estadoUsuario: EstadoUsuario;

  @ManyToOne(() => Rol, rol => rol.usuarios)
  rol: Rol;

  @OneToOne(() => Administrador, administrador => administrador.usuario, { eager: true, cascade: true })
  administrador: Administrador;
}