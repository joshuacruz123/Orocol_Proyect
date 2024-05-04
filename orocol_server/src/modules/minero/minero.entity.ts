// minero.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { CambioDocumento, TipoDocumento } from './minero.enum';
import { EntradaVentaEntity } from '../venta/entradaventas.entity';
import { TurnoMineroEntity } from './turno.entity';

@Entity({ name: 'Mineros' })
export class MineroEntity { 
  @PrimaryGeneratedColumn('increment')
  IdMinero: number; 

  @Column({type: 'varchar', length: 30, nullable: false})
  tipo_documento: TipoDocumento;

  @Column({ type: 'int', unique: true })
  numero_documento: number;

  @Column({type: 'varchar', length: 15, nullable: false})
  cambio_documento: CambioDocumento;
  
  @Column({ type: 'mediumint' })
  telefono: number;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column({ type: 'varchar', length: 55, nullable: false})
  direccion_vivienda: string;

  @OneToOne(() => UsuarioEntity, { cascade: true })
  @JoinColumn({ name: 'idUsuario' })
  usuario: UsuarioEntity; 

  @OneToMany(() => EntradaVentaEntity, (entradaVentas) => entradaVentas.minero)
  entradaVentas: EntradaVentaEntity[];

  @OneToMany(() => TurnoMineroEntity, (turno) => turno.minero)
  turno: TurnoMineroEntity[];
}