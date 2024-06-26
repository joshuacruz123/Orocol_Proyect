import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ManualUsuarioComponent } from './pages/home/manual-usuario/manual-usuario.component';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { IniciarSesionComponent } from './pages/auth/iniciar-sesion/iniciar-sesion.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { MineroComponent } from './pages/minero/minero.component';
import { EditarAdministradorComponent } from './pages/editar-usuario-propio/editar-administrador.component';
import { EditarMineroComponent } from './pages/editar-usuario-propio/editar-minero.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { IndicadoresFinancierosComponent } from './pages/indicadores-financieros/indicadores-financieros.component';
import { RecuperarContrasenaComponent } from './pages/auth/recuperar-contrasena/recuperar-contrasena.component';
import { EditarContrasenaComponent } from './pages/auth/recuperar-contrasena/editar-contrasena.component';
import { GestionarUsuariosComponent } from './pages/gestionar-usuarios/gestionar-usuarios.component';
import { AsistenciaMineroComponent } from './pages/asistencias/asistencia-minero/asistencia-minero.component';
import { AsistenciaAdminComponent } from './pages/asistencias/asistencia-admin/asistencia-admin.component';
import { adminGuard } from './core/guard/admin.guard';
import { mineroGuard } from './core/guard/minero.guard';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [ // alexV@gmail.com AAVelazco15872 | hernandez@gmail.com hernandezOrocol1 | joshuacruz@gmail.com JoshuaDesarrollador2006
    {path: '', component: HomeComponent},
    {path: 'manual_usuario', title: 'Manual de usuario', component: ManualUsuarioComponent},
    {path: 'registro', title: 'Registro', component: RegistroComponent},
    {path: 'recuperar_contrasena', title: 'Recuperar contraseña', component: RecuperarContrasenaComponent},
    {path: 'editar_contrasena', title: 'Editar contraseña', component: EditarContrasenaComponent},
    {path: 'iniciar_sesion', title: 'Iniciar sesión', component: IniciarSesionComponent},
    {path: 'administrador', title: 'Administrador', component: AdministradorComponent, canActivate: [adminGuard]},
    {path: 'editar_administrador/:idAdmin', title: 'Editar datos propios', component: EditarAdministradorComponent, canActivate: [adminGuard]},
    {path: 'minero', title: 'Minero', component: MineroComponent, canActivate: [mineroGuard]},
    {path: 'editar_minero/:IdMinero', title: 'Editar datos propios', component: EditarMineroComponent, canActivate: [mineroGuard]},
    {path: 'gestionar_usuarios', title: 'Gestionar usuarios', component: GestionarUsuariosComponent, canActivate: [adminGuard]},
    {path: 'productos', title: 'Productos', component: ProductosComponent, canActivate: [authGuard]},
    {path: 'ventas', title: 'Ventas', component: VentasComponent, canActivate: [authGuard]},
    {path: 'compras', title: 'Compras', component: ComprasComponent, canActivate: [adminGuard]},
    {path: 'ver_asistencias', title: 'Asistencia de mineros', component: AsistenciaAdminComponent, canActivate: [adminGuard]},
    {path: 'asistencias', title: 'Asistencias', component: AsistenciaMineroComponent, canActivate: [mineroGuard]},
    {path: 'indicadores_financieros', title: 'Indicadores financieros', component: IndicadoresFinancierosComponent, canActivate: [adminGuard]},
    //{path: '', title: '', component: },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '/iniciar_sesion' } 
];
