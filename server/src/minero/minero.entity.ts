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

@Entity({ name: 'Mineros' })
export class Minero {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  IdMinero: number;

  @Column({ type: 'enum', enum: TipoDocumento })
  tipo_documento: TipoDocumento;

  @Column({ type: 'bigint', unique: true })
  numero_documento: number;

  @Column({ 
  type: 'enum', enum: CambioDocumento, nullable: false})
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