import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from '../Producto/Producto.entity';
import { Administrador } from '../administrador/administrador.entity';


@Entity({ name: 'SalidaVentas' })
export class SalidaVenta {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  IdSalidaVenta: number;

  @Column({ type: 'float', unique: true })
  PesogrOro: number;

  @ManyToOne(() => Producto, { eager: true }) 
  @JoinColumn({ name: 'IdProdSV' })
  Productos: Producto; 

  @ManyToOne(() => Administrador, { eager: true }) 
  @JoinColumn({ name: 'IdAdminEV_FK' })
  Administradores: Administrador; 
}