import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MineroEntity } from '../minero/minero.entity';
import { EstadoVenta } from './venta.enum';
import { ProductoEntity } from '../producto/producto.entity';

@Entity({ name: 'EntradaVentas' })
export class EntradaVentaEntity {
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
   

  @ManyToOne(type => MineroEntity)
  @JoinColumn({ name: 'mineroId' })
  Mineros: MineroEntity;

  @ManyToOne(type => ProductoEntity)
  @JoinColumn({ name: 'productoId' })
  Productos: ProductoEntity;
}   