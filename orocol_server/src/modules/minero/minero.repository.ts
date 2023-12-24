import { Minero } from './minero.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Minero)
export class MineroRepository extends Repository<Minero> {}    