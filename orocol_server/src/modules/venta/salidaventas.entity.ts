import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductoEntity } from '../producto/producto.entity';
import { AdministradorEntity } from '../administrador/administrador.entity';


@Entity({ name: 'SalidaVentas' })
export class SalidaVentaEntity {
  @PrimaryGeneratedColumn('increment')
  IdSalidaVenta: number;

  @Column({ type: 'float' })
  PesogrOro: number;

  @ManyToOne(() => ProductoEntity, { eager: true }) 
  @JoinColumn({ name: 'IdProdSV' })
  Productos: ProductoEntity; 

  @ManyToOne(() => AdministradorEntity, { eager: true }) 
  @JoinColumn({ name: 'IdAdminEV_FK' })
  Administradores: AdministradorEntity; 
}  