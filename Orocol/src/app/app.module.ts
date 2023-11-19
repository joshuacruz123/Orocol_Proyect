import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
// Componentes
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { PieComponent } from './components/pie/pie.component';

// Modulos
import { SharedModule } from './shared/shared.module';
//paginas
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
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

@NgModule({
  declarations: [
    AppComponent,  
    EncabezadoComponent,
    PieComponent,
    HomeComponent,
    RegistroComponent,
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
    ManualUsuarioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
