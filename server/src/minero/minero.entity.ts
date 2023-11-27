// minero.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';

enum TipoDocumento {
    CedulaCiudadania = 'Cedula de ciudadania',
    CedulaExtranjeria = 'Cedula de Extranjeria',
  }
  
  enum CambioDocumento {
    NoAcepto = 'No acepto',
    Acepto = 'Acepto',
  }

@Entity({ name: 'mineros' })
export class Minero {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  IdMinero: number;

  @Column({ type: 'enum', enum: TipoDocumento })
  TipoDoc: TipoDocumento;

  @Column({ type: 'bigint', unique: true })
  NumeroDoc: number;

  @Column({
  type: 'enum', enum: CambioDocumento, nullable: false})
  cambioDocumento: CambioDocumento;
  
  @Column({ type: 'mediumint' })
  Telefono: number;

  @Column({ type: 'date' })
  FechaNacimiento: Date;

  @Column({ type: 'varchar', length: 255, nullable: false})
  DireccionVivienda: string;

  @ManyToOne(() => Usuario, { eager: true }) // eager loading para cargar el usuario al recuperar un administrador
  @JoinColumn({ name: 'IdUs_FK' })
  usuario: Usuario;
}