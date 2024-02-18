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

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: '/manual_usuario', component:ManualUsuarioComponent},
    {path: '/registro', component:RegistroComponent},
    {path: '/iniciar_sesion', component:IniciarSesionComponent},
    {path: '/administrador', component:AdministradorComponent},
    {path: '/minero', component:MineroComponent},
    {path: '/editar_administrador', component:EditarAdministradorComponent},
    {path: '/editar_minero', component:EditarMineroComponent},
    {path: '/productos', component:ProductosComponent},
    {path: '/ventas', component:VentasComponent},
    {path: '/compras', component:ComprasComponent},
    {path: '/repote_ventas', component:RepoteVentasComponent},
    {path: '/reporte_compras', component:ReporteComprasComponent},
    {path: '/novedades', component:NovedadesComponent},
    {path: '/turnos', component:TurnosComponent},
    {path: '/indicadores_financieros', component:IndicadoresFinancierosComponent},
    //{path: '/', component:},
];
