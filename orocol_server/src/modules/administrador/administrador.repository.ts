import { Administrador } from './administrador.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Administrador)
export class AdministradorRepository extends Repository<Administrador> {}   