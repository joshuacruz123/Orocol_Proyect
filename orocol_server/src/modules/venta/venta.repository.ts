import { EntradaVenta } from './entradaventas.entity';
import { SalidaVenta } from './salidaventas.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(EntradaVenta)
export class EntradaVentaRepository extends Repository<EntradaVenta> {}  

@EntityRepository(SalidaVenta)
export class SalidaVentaRepository extends Repository<SalidaVenta> {}  