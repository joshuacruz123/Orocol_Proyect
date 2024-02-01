// administrador.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { NovedadEntity } from '../novedad/novedad.entity';
import { SalidaVentaEntity } from '../venta/salidaventas.entity';

@Entity({ name: 'Administradores' })
export class AdministradorEntity {
  @PrimaryGeneratedColumn('increment')
  idAdmin: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  cargoAdmin: string;  

  @OneToOne(() => UsuarioEntity, { cascade: true })
  @JoinColumn({ name: 'idUsuario' })
  usuario: UsuarioEntity;

  @OneToMany(() => NovedadEntity, (novedad) => novedad.administrador)
  novedad: NovedadEntity[];

  @OneToMany(() => SalidaVentaEntity, (salida) => salida.administrador)
  salida: SalidaVentaEntity[];
}