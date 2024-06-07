// administrador.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { SalidaVentaEntity } from './salidaventas.entity';

@Entity({ name: 'Administradores' })
export class AdministradorEntity {
  @PrimaryGeneratedColumn('increment')
  idAdmin: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  cargoAdmin: string;  

  @OneToOne(() => UsuarioEntity, { cascade: true })
  @JoinColumn({ name: 'idUsuario' })
  usuario: UsuarioEntity;

  @OneToMany(() => SalidaVentaEntity, (salida) => salida.administrador)
  salida: SalidaVentaEntity[]; 
}