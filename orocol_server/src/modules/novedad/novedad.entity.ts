import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MineroEntity } from '../minero/minero.entity';
import { AdministradorEntity } from 'src/modules/administrador/administrador.entity';

@Entity({ name: 'novedades' })
export class NovedadEntity {
  @PrimaryGeneratedColumn('increment')
  idNovedad: number;

  @Column({ type: 'date', nullable: false })
  fechaNovedad: Date;

  @Column({ type: 'text', nullable: false })
  descripcion: string;

  @ManyToOne(() => MineroEntity, { eager: true }) 
  @JoinColumn({ name: 'IdMinN_FK' })
  mineros: MineroEntity;

  @ManyToOne(() => AdministradorEntity, { eager: true }) 
  @JoinColumn({ name: 'IdAdminN_FK' })
  administradores: AdministradorEntity;
}  


/* 
create table Novedad
(
Id_Novedad bigint unsigned primary key auto_increment,
fecha_Novedad date not null,
descripcion text not null,
IdMINERO bigint unsigned not null, foreign key (IdMINERO) references usuario (IdUsuario),
IdAdmin bigint unsigned not null, foreign key (IdAdmin) references Administrador (IdAdmin)
);
*/