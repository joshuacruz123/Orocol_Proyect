import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SalidaVentaEntity } from '../venta/salidaventas.entity';
import { EstadoCompra } from './cliente.enum';

@Entity({ name: 'Clientes' })
export class ClienteEntity {
  @PrimaryGeneratedColumn('increment')
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

  @Column({type: 'varchar', length: 15, nullable: false, default: EstadoCompra.ACTIVO})
  estadoCompra: EstadoCompra;

  @ManyToOne(() => SalidaVentaEntity, { eager: true }) 
  @JoinColumn({ name: 'IdSalidaEV_FK' })
  SalidaVentas: SalidaVentaEntity; 
} 