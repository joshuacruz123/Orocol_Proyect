// administrador.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity';

@Entity({ name: 'Administradores' })
export class Administrador {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  idAdmin: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  cargoAdmin: string;  

  @OneToOne(() => Usuario, usuario => usuario.administrador)
  @JoinColumn({ name: 'IdUs_FK' })
  usuario: Usuario;
}
