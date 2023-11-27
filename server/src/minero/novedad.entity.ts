// turno.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Minero } from './minero.entity';
import { Administrador } from 'src/administrador/administrador.entity';

enum Asistencia {
  Si = 'Sí',
  No = 'Nó',
}

@Entity({ name: 'novedades' })
export class Novedad {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  Id_Novedad: number;

  @Column({ type: 'date', nullable: false })
  fecha_Novedad: Date;

  @Column({ type: 'text', nullable: false })
  descripcion: Text;

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