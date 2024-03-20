import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ManualUsuarioComponent } from './pages/home/manual-usuario/manual-usuario.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { IniciarSesionComponent } from './pages/auth/iniciar-sesion/iniciar-sesion.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { MineroComponent } from './pages/minero/minero.component';
import { EditarAdministradorComponent } from './pages/administrador/editar-administrador/editar-administrador.component';
import { EditarMineroComponent } from './pages/minero/editar-minero/editar-minero.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { ReporteComprasComponent } from './pages/compras/reporte-compras/reporte-compras.component';
import { RepoteVentasComponent } from './pages/ventas/repote-ventas/repote-ventas.component';
import { NovedadesComponent } from './pages/minero/novedades/novedades.component';
import { TurnosComponent } from './pages/minero/turnos/turnos.component';
import { IndicadoresFinancierosComponent } from './pages/indicadores-financieros/indicadores-financieros.component';
import { CrearProductoComponent } from './pages/productos/crear-producto/crear-producto.component';
import { LoginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'manual_usuario', title: 'Manual de usuario', component: ManualUsuarioComponent, canActivate: [LoginGuard]},
    {path: 'registro', title: 'Registro', component: RegistroComponent, canActivate: [LoginGuard]},
    {path: 'iniciar_sesion', title: 'Iniciar sesión', component: IniciarSesionComponent, canActivate: [LoginGuard]},
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
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '/iniciar_sesion' } 
];
