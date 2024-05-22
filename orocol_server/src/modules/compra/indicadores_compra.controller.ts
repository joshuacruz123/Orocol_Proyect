import { Controller, Get, UseGuards} from '@nestjs/common'
import { CompraService } from './compra.service';
import { RolNombre } from '../rol/rol.enum';
import { RolDecorator } from 'src/decorators/rol.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/rol.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Indicadores de compras')
@Controller('indicadores')
export class IndicadoresCompraController {

    constructor(private readonly compraService: CompraService) {}

    @RolDecorator(RolNombre.ADMINISTRADOR)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async obtenerIndicadoresFinancieros() {
        return await this.compraService.obtenerIndicadoresFinancieros();
    }
}