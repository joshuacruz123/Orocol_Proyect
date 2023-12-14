import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
// Componentes
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { PieComponent } from './components/pie/pie.component';
import { GestionClienteComponent } from './pages/gestion-cliente/gestion-cliente.component';
import { GestionNovedadesMinComponent } from './pages/gestion-novedades-min/gestion-novedades-min.component';
import { VerNovedadesAdminComponent } from './pages/ver-novedades-admin/ver-novedades-admin.component';
import { EditarVentaComponent } from './pages/editar-venta/editar-venta.component';
import { EditarVentaMinComponent } from './pages/editar-venta-min/editar-venta-min.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { EditarClienteComponent } from './pages/editar-cliente/editar-cliente.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';
import { EditarNovedadMinComponent } from './pages/editar-novedad-min/editar-novedad-min.component';
import { VerClientesMinComponent } from './pages/ver-clientes-min/ver-clientes-min.component';

// Modulos
import { SharedModule } from './shared/shared.module';
//paginas
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormularioAdministradorComponent } from './components/formulario-administrador/formulario-administrador.component';
import { FormularioMineroComponent } from './components/formulario-minero/formulario-minero.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { MineroComponent } from './pages/minero/minero.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AgregarEditarPersonaComponent } from './components/agregar-editar-persona/agregar-editar-persona.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { SolicitarReactivacionComponent } from './components/solicitar-reactivacion/solicitar-reactivacion.component';
import { NovedadMineroComponent } from './components/novedad-minero/novedad-minero.component';
import { GestionarProductosComponent } from './pages/gestionar-productos/gestionar-productos.component';
import { ProductosMineroComponent } from './pages/productos-minero/productos-minero.component';
import { InsertarProductoComponent } from './components/insertar-producto/insertar-producto.component';
import { InsertarVentaComponent } from './components/insertar-venta/insertar-venta.component';
import { GestionarVentaComponent } from './pages/gestionar-venta/gestionar-venta.component';
import { IndicadoresFinancierosComponent } from './components/indicadores-financieros/indicadores-financieros.component';
import { EditarAdministradorComponent } from './pages/editar-administrador/editar-administrador.component';
import { EditarMineroComponent } from './pages/editar-minero/editar-minero.component';
import { VentaMineroComponent } from './pages/venta-minero/venta-minero.component';
import { CarouselComponent } from './components/carousel/carousel.component';
//pdf
import { ManualUsuarioComponent } from './pages/manual-usuario/manual-usuario.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';

@NgModule({ 
  declarations: [
    AppComponent,  
    EncabezadoComponent,
    PieComponent,
    HomeComponent,
    RegistroComponent,
    FormularioAdministradorComponent,
    FormularioMineroComponent,
    IniciarSesionComponent,
    MineroComponent,
    AdministradorComponent,
    UsuariosComponent,
    AgregarEditarPersonaComponent,
    QuienesSomosComponent,
    SolicitarReactivacionComponent,
    NovedadMineroComponent,
    GestionarProductosComponent,
    ProductosMineroComponent,
    InsertarProductoComponent,
    InsertarVentaComponent,
    GestionarVentaComponent,
    IndicadoresFinancierosComponent,
    EditarAdministradorComponent,
    EditarMineroComponent,
    VentaMineroComponent,
    CarouselComponent,
    ManualUsuarioComponent,
    GestionClienteComponent,
    GestionNovedadesMinComponent,
    VerNovedadesAdminComponent,
    EditarVentaComponent,
    EditarVentaMinComponent,
    EditarUsuarioComponent,
    EditarClienteComponent,
    EditarProductoComponent,
    EditarNovedadMinComponent,
    VerClientesMinComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
