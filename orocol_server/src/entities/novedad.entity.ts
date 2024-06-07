import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { TurnoMineroEntity } from './turno.entity';

@Entity({ name: 'novedades' })
export class NovedadEntity {
  @PrimaryGeneratedColumn('increment')
  idNovedad: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // datetime en MySQL
  fechaNovedad: Date;

  @Column({ type: 'text', nullable: false })
  descripcion: string;

  @OneToOne(() => TurnoMineroEntity)
  @JoinColumn({ name: 'idTurno' })
  turno: TurnoMineroEntity;
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