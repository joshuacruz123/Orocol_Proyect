import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Entity({ name: 'solicitudes' })
export class SolicitudEntity {
  @PrimaryGeneratedColumn('increment')
  idSolicitud: number;

  @Column({ type: 'text', nullable: false })
  descripcionSolicitud: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.solicitud)
  @JoinColumn({ name: 'idUsuario' })
  usuario: UsuarioEntity;
}