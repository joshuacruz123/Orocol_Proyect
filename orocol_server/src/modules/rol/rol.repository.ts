import { Rol } from './rol.entity';
import { create } from "domain";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Rol)
export class RolRepository extends Repository<Rol> {}  