// administrador.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity({ name: 'Administradores' })
export class Administrador {
  @PrimaryGeneratedColumn('increment')
  idAdmin: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  cargoAdmin: string;  

  @ManyToOne(() => Usuario, { eager: true }) // eager loading para cargar el usuario al recuperar un administrador
  @JoinColumn({ name: 'IdUs_FK' })
  Usuarios: Usuario;  
} 
 