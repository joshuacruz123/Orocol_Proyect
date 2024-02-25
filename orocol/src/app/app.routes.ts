import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ManualUsuarioComponent } from './pages/manual-usuario/manual-usuario.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { MineroComponent } from './pages/minero/minero.component';
import { EditarAdministradorComponent } from './pages/editar-administrador/editar-administrador.component';
import { EditarMineroComponent } from './pages/editar-minero/editar-minero.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { ReporteComprasComponent } from './pages/reporte-compras/reporte-compras.component';
import { RepoteVentasComponent } from './pages/repote-ventas/repote-ventas.component';
import { NovedadesComponent } from './pages/novedades/novedades.component';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { IndicadoresFinancierosComponent } from './pages/indicadores-financieros/indicadores-financieros.component';
import { CrearProductoComponent } from './pages/productos/crear-producto/crear-producto.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'manual_usuario', title: 'Manual de usuario', component: ManualUsuarioComponent},
    {path: 'registro', title: 'Registro', component: RegistroComponent},
    {path: 'iniciar_sesion', title: 'Iniciar sesión', component: IniciarSesionComponent},
    {path: 'administrador', title: 'Administrador', component: AdministradorComponent},
    {path: 'minero', title: 'Minero', component: MineroComponent},
    {path: 'editar_administrador', title: 'Editar usuario', component: EditarAdministradorComponent},
    {path: 'editar_minero', title: 'Editar usuario', component: EditarMineroComponent},
    {path: 'productos', title: 'Productos', component: ProductosComponent},
    {path: 'nuevo_producto', title: 'Nuevo producto', component: CrearProductoComponent},
    {path: 'ventas', title: 'Ventas', component: VentasComponent},
    {path: 'compras', title: 'Compras', component: ComprasComponent},
    {path: 'repote_ventas', title: 'Reportes de ventas', component: RepoteVentasComponent},
    {path: 'reporte_compras', title: 'Reportes de compras', component: ReporteComprasComponent},
    {path: 'novedades', title: 'Novedades', component: NovedadesComponent},
    {path: 'turnos', title: 'Turnos', component: TurnosComponent},
    {path: 'indicadores_financieros', title: 'Indicadores financieros', component: IndicadoresFinancierosComponent},
    //{path: '', title: '', component: },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
