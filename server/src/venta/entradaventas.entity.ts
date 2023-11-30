import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Minero } from '../minero/minero.entity';
  
  enum EstadoVenta {
    ACTIVO = 'Activo',
    INACTIVO = 'Inactivo', 
  }  

@Entity({ name: 'EntradaVentas' })
export class EntradaVenta {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  idGestionVenta: number;

  @Column({ type: 'date' })
  fechaExtraccionOro: Date;

  @Column({ type: 'mediumint', nullable: false })
  precioOro: number;

  @Column({ type: 'int', nullable: false })
  cantidad: number;

  @Column({
    type: 'enum',
    enum: EstadoVenta,
    default: EstadoVenta.ACTIVO,
  })
  estadoVenta: EstadoVenta;
  

  @ManyToOne(() => Minero, { eager: true }) 
  @JoinColumn({ name: 'IdMinEV_FK' })
  Mineros: Minero; 
}