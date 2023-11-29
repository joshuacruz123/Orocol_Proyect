import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EntradaVenta } from '../venta/entradaventas.entity';
  
  enum EstadoProducto {
    ACTIVO = 'Activo',
    INACTIVO = 'Inactivo', 
  }

@Entity({ name: 'Productos' })
export class Producto {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  IdProducto: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  TipoOro: string;  

  @Column({
    type: 'enum',
    enum: EstadoProducto,
    default: EstadoProducto.ACTIVO,
  })
  Estadoproducto: EstadoProducto;
  

  @ManyToOne(() => EntradaVenta, { eager: true }) 
  @JoinColumn({ name: 'IdEVPr_FK' })
  EntradaVentas: EntradaVenta; 
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