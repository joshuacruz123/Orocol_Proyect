import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SalidaVentaEntity } from '../venta/salidaventas.entity';
import { EstadoCompra } from './cliente.enum';

@Entity({ name: 'Clientes' })
export class ClienteEntity {
  @PrimaryGeneratedColumn('increment')
  IdCliente: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  NombreCompleto: string; 

  @Column({ type: 'varchar', length: 70, nullable: true })
  Empresa: string;

  @Column({ type: 'varchar', length: 55, nullable: false })
  Pais: string;

  @Column({ type: 'varchar', length: 80, nullable: false })
  CiudadMunicipio: string;

  @Column({ type: 'date' }) 
  FechaExportacion: Date;

  @Column({type: 'varchar', length: 15, nullable: false, default: EstadoCompra.ACTIVO})
  estadoCompra: EstadoCompra;

  @ManyToOne(() => SalidaVentaEntity, (SalidaVentas) => SalidaVentas.compras, { cascade: true })
  @JoinColumn({ name: 'IdSalidaVenta' })
  salidaVentas: SalidaVentaEntity;
} 