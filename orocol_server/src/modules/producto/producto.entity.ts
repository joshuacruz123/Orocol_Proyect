import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { EntradaVentaEntity } from '../venta/entradaventas.entity';
import { EstadoProducto } from './producto.enum';

@Entity({ name: 'Productos' })
export class ProductoEntity {
  @PrimaryGeneratedColumn('increment')
  IdProducto: number;

  @Column({ type: 'varchar', length: 60, nullable: false, unique: true })
  TipoOro: string;   

  @Column({type: 'varchar', length: 15, nullable: false, default: EstadoProducto.ACTIVO})
  estadoProducto: EstadoProducto;
  
  @OneToMany(() => EntradaVentaEntity, (entradaVentas) => entradaVentas.producto)
  entradaVentas: EntradaVentaEntity[];
}
   
/*
create table Producto
(
IdProducto bigint unsigned primary key auto_increment,
TipoOro varchar(255)not null,
Estadoproducto enum('activo','inactivo') default 'activo',
Idgestion_FK bigint unsigned not null, foreign key (Idgestion_FK)  references GestionVentas  (Idgestionventa)
);
*/