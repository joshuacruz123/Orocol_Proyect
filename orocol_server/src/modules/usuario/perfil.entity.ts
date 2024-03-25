import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Entity({ name: 'perfil' })
export class PerfilEntity {
  @PrimaryGeneratedColumn('increment')
  idPerfil: number;

  @Column()
  fotoPerfil: string; // Aquí se almacenará la ruta de la foto de perfil

  @OneToOne(() => UsuarioEntity)
  @JoinColumn({ name: 'idUsuario' })
  usuario: UsuarioEntity;
}