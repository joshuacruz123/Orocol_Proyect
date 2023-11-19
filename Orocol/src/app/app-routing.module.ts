import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//paginas
import { HomeComponent } from './pages/home/home.component';
import { ManualUsuarioComponent } from './pages/manual-usuario/manual-usuario.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { MineroComponent } from './pages/minero/minero.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { GestionarProductosComponent } from './pages/gestionar-productos/gestionar-productos.component';
import { ProductosMineroComponent } from './pages/productos-minero/productos-minero.component';
import { GestionarVentaComponent } from './pages/gestionar-venta/gestionar-venta.component';
import { EditarAdministradorComponent } from './pages/editar-administrador/editar-administrador.component';
import { EditarMineroComponent } from './pages/editar-minero/editar-minero.component';
import { VentaMineroComponent } from './pages/venta-minero/venta-minero.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'Manual_Usuario', component: ManualUsuarioComponent}, 
  { path: 'Registro', component: RegistroComponent },
  { path: 'Iniciar_sesión', component: IniciarSesionComponent },
  { path: 'Administrador', component: AdministradorComponent },
  { path: 'Editar_administrador', component: EditarAdministradorComponent },
  { path: 'Usuarios', component: UsuariosComponent },
  { path: 'Gestionar_productos', component: GestionarProductosComponent },
  { path: 'Gestionar_venta', component: GestionarVentaComponent },
  { path: 'Minero', component: MineroComponent },
  { path: 'Editar_minero', component: EditarMineroComponent },
  { path: 'Productos_minero', component: ProductosMineroComponent },
  { path: 'Venta_minero', component: VentaMineroComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
