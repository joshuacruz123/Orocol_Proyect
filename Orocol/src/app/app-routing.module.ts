import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { MineroComponent } from './minero/minero.component';
import { UsuariosComponent } from './usuarios/usuarios.component';/*
import { InicioComponent } from './inicio/inicio.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioComponent } from './inicio/inicio.component';*/

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Registro', component: RegistroComponent },
  { path: 'Iniciar sesión', component: IniciarSesionComponent },
  { path: 'Administrador', component: AdministradorComponent },
  { path: 'Minero', component: MineroComponent },
  { path: 'Usuarios', component: UsuariosComponent }/*
  { path: 'inicio', component: InicioComponent }
  { path: 'inicio', component: InicioComponent }
  { path: 'inicio', component: InicioComponent }
  { path: 'inicio', component: InicioComponent }*/
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
