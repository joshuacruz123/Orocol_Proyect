import { Novedad } from './novedad.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Novedad)
export class NovedadRepository extends Repository<Novedad> {}    