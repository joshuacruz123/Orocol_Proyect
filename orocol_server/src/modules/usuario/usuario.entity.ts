import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// , OneToOne, OneToMany, JoinTable, ManyToMany
import { Rol } from '../rol/rol.entity';
import { EstadoUsuario } from './usuario.enum';
import { hash } from 'bcryptjs';
   
  @Entity({ name: 'Usuarios' })
  export class Usuario {

    //@PrimaryGeneratedColumn('increment') 
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
  
    @Column({type: 'varchar', length: 55, nullable: false, default: EstadoUsuario.ACTIVO})
    estadoUsuario: EstadoUsuario;

    @ManyToOne(() => Rol, rol => rol.usuarios)
    @JoinColumn({ name: 'IdUs_FK' })
    roles: Rol[];
     
    @BeforeInsert()
    @BeforeUpdate()
    async hashPasword() {
        if(!this.passwordUsuario) return;
        this.passwordUsuario = await hash(this.passwordUsuario, 55);
    }
}