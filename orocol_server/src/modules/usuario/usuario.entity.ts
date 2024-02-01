import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RolEntity } from '../rol/rol.entity';
import { EstadoUsuario } from './usuario.enum';
import { hash } from 'bcryptjs';
import { MineroEntity } from "../minero/minero.entity";
import { AdministradorEntity } from "../administrador/administrador.entity";
   
  @Entity({ name: 'Usuarios' })
  export class UsuarioEntity {
 
    @PrimaryGeneratedColumn('increment')
    idUsuario: number;
  
    @Column({ type: 'varchar', length: 60, nullable: false })
    nombreUsuario: string;
  
    @Column({ type: 'varchar', length: 60, nullable: true })
    apellidosUsuario: string;
   
    @Column({ type: 'varchar', length: 70, unique: true, nullable: false })
    correoUsuario: string;
  
    @Column({ type: 'varchar', length: 60, nullable: false })
    passwordUsuario: string;
  
    @Column({type: 'varchar', length: 55, nullable: false, default: EstadoUsuario.ACTIVO})
    estadoUsuario: EstadoUsuario;

    @ManyToOne(() => RolEntity, (roles) => roles.usuario)
    @JoinColumn({ name: 'idRol' })
    roles: RolEntity;

    @OneToOne(() => AdministradorEntity, (administrador) => administrador.usuario)
    administrador: AdministradorEntity;

    @OneToOne(() => MineroEntity, (minero) => minero.usuario)
    minero: MineroEntity;
    
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if(!this.passwordUsuario) return;
        this.passwordUsuario = await hash(this.passwordUsuario, 10);
    } 
}