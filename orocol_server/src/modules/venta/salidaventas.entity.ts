import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from '../producto/producto.entity';
import { Administrador } from '../administrador/administrador.entity';


@Entity({ name: 'SalidaVentas' })
export class SalidaVenta {
  @PrimaryGeneratedColumn('increment')
  IdSalidaVenta: number;

  @Column({ type: 'float' })
  PesogrOro: number;

  @ManyToOne(() => Producto, { eager: true }) 
  @JoinColumn({ name: 'IdProdSV' })
  Productos: Producto; 

  @ManyToOne(() => Administrador, { eager: true }) 
  @JoinColumn({ name: 'IdAdminEV_FK' })
  Administradores: Administrador; 
}  