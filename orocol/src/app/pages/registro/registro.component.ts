import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { PieComponent } from '../pie/pie.component';
import { FormularioAdministradorComponent } from '../formulario-administrador/formulario-administrador.component';
import { FormularioMineroComponent } from '../formulario-minero/formulario-minero.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, PieComponent, FormularioAdministradorComponent, FormularioMineroComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  tipoUsuario: string = '';
}
