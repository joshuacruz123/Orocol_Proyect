import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Minero } from '../minero/minero.entity';
import { EstadoVenta } from './venta.enum';

@Entity({ name: 'EntradaVentas' })
export class EntradaVenta {
  @PrimaryGeneratedColumn('increment')
  idGestionVenta: number; 

  @Column({ type: 'date' })
  fechaExtraccionOro: Date;

  @Column({ type: 'mediumint', nullable: false })
  precioOro: number;

  @Column({ type: 'int', nullable: false })
  cantidad: number;

  @Column({type: 'varchar', length: 15, nullable: false, unique: true, default: EstadoVenta.ACTIVO})
  estadoVenta: EstadoVenta;
  

  @ManyToOne(() => Minero, { eager: true }) 
  @JoinColumn({ name: 'IdMinEV_FK' })
  Mineros: Minero; 
}  