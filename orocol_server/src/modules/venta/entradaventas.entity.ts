import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { MineroEntity } from '../minero/minero.entity';
import { EstadoVenta } from './venta.enum';
import { ProductoEntity } from '../producto/producto.entity';
import { SalidaVentaEntity } from './salidaventas.entity';

@Entity({ name: 'EntradaVentas' })
export class EntradaVentaEntity {
  @PrimaryGeneratedColumn('increment')
  idGestionVenta: number; 

  @Column({ type: 'date' })
  fechaExtraccionOro: Date;

  @Column({ type: 'float', nullable: false })
  precioOro: number;

  @Column({ type: 'float', nullable: false })
  cantidad: number;

  @Column({type: 'varchar', length: 15, nullable: false, default: EstadoVenta.ACTIVO})
  estadoVenta: EstadoVenta;
 
  @ManyToOne(() => MineroEntity, (minero) => minero.entradaVentas)
  @JoinColumn({ name: 'IdMinero' })
  minero: MineroEntity;
  
  @ManyToOne(() => ProductoEntity, (producto) => producto.entradaVentas)
  @JoinColumn({ name: 'IdProducto' })
  producto: ProductoEntity; 

  @OneToOne(() => SalidaVentaEntity, (salida) => salida.entrada)
  salida: SalidaVentaEntity;
}