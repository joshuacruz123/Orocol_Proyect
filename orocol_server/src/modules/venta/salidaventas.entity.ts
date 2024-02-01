import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { AdministradorEntity } from '../administrador/administrador.entity';
import { EntradaVentaEntity } from './entradaventas.entity';
import { ClienteEntity } from '../compra/cliente.entity';


@Entity({ name: 'SalidaVentas' })
export class SalidaVentaEntity {
  
  @PrimaryGeneratedColumn('increment')
  IdSalidaVenta: number;

  @Column({ type: 'float' })
  PesogrOro: number;

  @OneToOne(() => EntradaVentaEntity, { cascade: true })
  @JoinColumn({ name: 'idGestionVenta' })
  entrada: EntradaVentaEntity; 

  @ManyToOne(() => AdministradorEntity, (administrador) => administrador.salida, { cascade: true })
  @JoinColumn({ name: 'idAdmin' })
  administrador: AdministradorEntity;

  @OneToMany(() => ClienteEntity, (compras) => compras.SalidaVentas)
  compras: ClienteEntity[];
}   