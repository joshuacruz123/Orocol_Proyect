import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, ManyToOne } from 'typeorm';
import { Rol } from '../rol/rol.entity';
import { EstadoUsuario } from './usuario.enum';
   
  @Entity({ name: 'Usuarios' })
  export class Usuario {
    @PrimaryGeneratedColumn('increment') 
    idUsuario: number;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    nombreUsuario: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    apellidosUsuario: string;
   
    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    correoUsuario: string;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    passwordUsuario: string;
  
    @Column({type: 'varchar', length: 15, nullable: false, unique: true, default: EstadoUsuario.ACTIVO})
    estadoUsuario: EstadoUsuario;

    @ManyToMany(type => Rol, rol => rol.usuarios, {eager: true})
    @JoinTable({
      name: 'usuario_rol',
      joinColumn: {name: 'usuario_id'},
      inverseJoinColumn: {name: 'rol_id'}
    })
    roles: Rol[];
    administrador: any;
}