import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SalidaVenta } from '../venta/salidaventas.entity';


@Entity({ name: 'Clientes' })
export class Cliente {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  IdCliente: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  NombreCompleto: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Empresa: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  Pais: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  CiudadMunicipio: string;

  @Column({ type: 'date' })
  FechaExportacion: Date;

  @ManyToOne(() => SalidaVenta, { eager: true }) 
  @JoinColumn({ name: 'IdSalidaEV_FK' })
  SalidaVentas: SalidaVenta; 
}