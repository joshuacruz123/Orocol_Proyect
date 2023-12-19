import { Usuario } from 'src/modules/usuario/usuario.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Usuario)
export class AuthRepository extends Repository<Usuario> {}
