// minero.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { CambioDocumento, TipoDocumento } from './minero.enum';

@Entity({ name: 'Mineros' })
export class Minero {
  @PrimaryGeneratedColumn('increment')
  IdMinero: number;

  @Column({type: 'varchar', length: 22, nullable: false, unique: true})
  tipo_documento: TipoDocumento;

  @Column({ type: 'bigint', unique: true })
  numero_documento: number;

  @Column({type: 'varchar', length: 15, nullable: false, unique: true})
  cambio_documento: CambioDocumento;
  
  @Column({ type: 'mediumint' })
  telefono: number;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column({ type: 'varchar', length: 255, nullable: false})
  direccion_vivienda: string;

  @ManyToOne(() => Usuario, { eager: true }) // eager loading para cargar el usuario al recuperar un administrador
  @JoinColumn({ name: 'IdUs_FK' })
  Usuarios: Usuario; 
} 