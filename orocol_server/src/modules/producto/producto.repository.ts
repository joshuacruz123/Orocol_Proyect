import { Producto } from './producto.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Producto)
export class ProductoRepository extends Repository<Producto> {}    