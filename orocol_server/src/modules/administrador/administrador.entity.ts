// administrador.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity({ name: 'Administradores' })
export class AdministradorEntity {
  @PrimaryGeneratedColumn('increment')
  idAdmin: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  cargoAdmin: string;  

  @ManyToOne(() => UsuarioEntity, { eager: true }) // eager loading para cargar el usuario al recuperar un administrador
  @JoinColumn({ name: 'IdUs_FK' })
  Usuarios: UsuarioEntity;  
} 
 