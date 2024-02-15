import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';

@Entity({ name: 'perfil' })
export class PerfilEntity {
  save(perfil: PerfilEntity) {
      throw new Error('Method not implemented.');
  }

  @PrimaryGeneratedColumn('increment')
  idPerfil: number;

  @Column()
  fotoPerfil: string;

  @OneToOne(() => UsuarioEntity)
  @JoinColumn({ name: 'idUsuario' })
  usuario: UsuarioEntity;
}