import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Minero } from '../minero/minero.entity';
import { EstadoVenta } from './venta.enum';
import { Producto } from '../producto/producto.entity';

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

  @Column({type: 'varchar', length: 15, nullable: false, default: EstadoVenta.ACTIVO})
  estadoVenta: EstadoVenta;
   

  @ManyToOne(type => Minero)
  @JoinColumn({ name: 'mineroId' })
  Mineros: Minero;

  @ManyToOne(type => Producto)
  @JoinColumn({ name: 'productoId' })
  Productos: Producto;
}   