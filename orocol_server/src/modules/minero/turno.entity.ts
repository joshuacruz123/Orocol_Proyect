// turno.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Minero } from './minero.entity';
import { Asistencia } from './turno.enum';

@Entity({ name: 'turnoMinero' })
export class TurnoMinero {
  @PrimaryGeneratedColumn('increment')
  idTurno: number;

  @Column({ type: 'datetime', nullable: false })
  FechaTurno: Date;

  @Column({type: 'varchar', length: 15, nullable: false})
  Asistencia: Asistencia;

  @Column({ type: 'varchar', length: 255, nullable: false })
  AsignacionTareas: string;

  @ManyToOne(() => Minero, { eager: true }) // eager loading para cargar el Minero al recuperar un rol
  @JoinColumn({ name: 'IdMinT_FK' })
  mineros: Minero;
}  

/* 
create table TurnoMinero
(
FechaTurno datetime not null,
Asistencia boolean not null,
AsignacionTareas varchar(255) not null,
);
*/