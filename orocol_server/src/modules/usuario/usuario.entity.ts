import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// , OneToOne, ManyToOne
import { Rol } from '../rol/rol.entity';
import { EstadoUsuario } from './usuario.enum';
import { hash } from 'bcryptjs';
import { Administrador } from "src/modules/administrador/administrador.entity";
   
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
  
    @Column({type: 'varchar', length: 55, nullable: false, unique: true, default: EstadoUsuario.ACTIVO})
    estadoUsuario: EstadoUsuario;

    @ManyToMany(type => Rol, rol => rol.usuarios, {eager: true})
    @JoinTable({
      name: 'usuario_rol',
      joinColumn: {name: 'usuario_id'},
      inverseJoinColumn: {name: 'rol_id'}
    })
    roles: Rol[];
     
    @BeforeInsert()
    @BeforeUpdate()
    async hashPasword() {
        if(!this.passwordUsuario) return;
        this.passwordUsuario = await hash(this.passwordUsuario, 55);
    }

    @OneToOne(() => Administrador, administrador => administrador.usuario)
    @JoinColumn({ name: 'IdUs_FK' })
    administrador: Administrador;
}