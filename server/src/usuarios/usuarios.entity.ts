// usuario.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Rol } from './rol.entity';
import { Administrador } from '../administrador/administrador.entity'; // Importa la entidad Administrador

enum EstadoUsuario {
  ACTIVO = 'activo',
  INACTIVO = 'inactivo',
}

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id_usuario: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nombre_usuario: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  apellidos_usuario: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  correo_usuario: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password_usuario: string;

  @Column({
    type: 'enum',
    enum: EstadoUsuario,
    default: EstadoUsuario.ACTIVO,
  })
  estado_usuario: EstadoUsuario;

  @ManyToOne(() => Rol, rol => rol.usuarios)
  rol: Rol;

  @OneToOne(() => Administrador, administrador => administrador.usuario, { eager: true, cascade: true })
  administrador: Administrador;
}
