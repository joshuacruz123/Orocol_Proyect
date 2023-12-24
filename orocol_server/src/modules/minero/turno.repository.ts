import { TurnoMinero } from './turno.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(TurnoMinero)
export class TurnoRepository extends Repository<TurnoMinero> {}    