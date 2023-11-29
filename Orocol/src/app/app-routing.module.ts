import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//paginas
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { EditarAdministradorComponent } from './pages/editar-administrador/editar-administrador.component';
import { EditarClienteComponent } from './pages/editar-cliente/editar-cliente.component';
import { EditarMineroComponent } from './pages/editar-minero/editar-minero.component';
import { EditarNovedadMinComponent } from './pages/editar-novedad-min/editar-novedad-min.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';  
import { EditarVentaMinComponent } from './pages/editar-venta-min/editar-venta-min.component';
import { EditarVentaComponent } from './pages/editar-venta/editar-venta.component';
import { GestionClienteComponent } from './pages/gestion-cliente/gestion-cliente.component';
import { GestionNovedadesMinComponent } from './pages/gestion-novedades-min/gestion-novedades-min.component';
import { GestionarProductosComponent } from './pages/gestionar-productos/gestionar-productos.component';
import { GestionarVentaComponent } from './pages/gestionar-venta/gestionar-venta.component';
import { HomeComponent } from './pages/home/home.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { ManualUsuarioComponent } from './pages/manual-usuario/manual-usuario.component';
import { MineroComponent } from './pages/minero/minero.component';
import { ProductosMineroComponent } from './pages/productos-minero/productos-minero.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { VentaMineroComponent } from './pages/venta-minero/venta-minero.component';
import { VerClientesMinComponent } from './pages/ver-clientes-min/ver-clientes-min.component';
import { VerNovedadesAdminComponent } from './pages/ver-novedades-admin/ver-novedades-admin.component';

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
  { path: 'Venta_minero', component: VentaMineroComponent },
  { path: 'Gestionar_clientes', component: GestionClienteComponent},
  { path: 'Gestionar_novedades_min', component: GestionNovedadesMinComponent},
  { path: 'Ver_novedades_admin', component: VerNovedadesAdminComponent },
  { path: 'Editar_cliente', component: EditarClienteComponent },
  { path: 'Editar_novedad_min', component:EditarNovedadMinComponent},
  { path: 'Editar_producto', component: EditarProductoComponent},
  { path: 'Editar_usuario', component: EditarUsuarioComponent},
  { path: 'Editar_venta', component: EditarVentaComponent},
  { path: 'Editar_venta_min', component: EditarVentaMinComponent},
  { path: 'Ver_clientes_min', component: VerClientesMinComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
