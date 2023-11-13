import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';/*
import { RecuperaPassComponent } from './recupera-pass/recupera-pass.component';
import { InicioComponent } from './inicio/inicio.component';*/

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registro', component: RegistroComponent }/*
  { path: 'recupera-pass', component: RecuperaPassComponent },
  { path: 'inicio', component: InicioComponent }*/
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
