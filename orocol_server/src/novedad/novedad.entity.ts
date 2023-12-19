import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Minero } from '../minero/minero.entity';
import { Administrador } from 'src/administrador/administrador.entity';

@Entity({ name: 'novedades' })
export class Novedad {
  @PrimaryGeneratedColumn('increment')
  idNovedad: number;

  @Column({ type: 'date', nullable: false })
  fechaNovedad: Date;

  @Column({ type: 'text', nullable: false })
  descripcion: string;

  @ManyToOne(() => Minero, { eager: true }) 
  @JoinColumn({ name: 'IdMinN_FK' })
  mineros: Minero;

  @ManyToOne(() => Administrador, { eager: true }) 
  @JoinColumn({ name: 'IdAdminN_FK' })
  administradores: Administrador;
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