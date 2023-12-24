import { Cliente } from './cliente.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Cliente)
export class ClienteRepository extends Repository<Cliente> {}    