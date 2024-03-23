import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PieComponent } from '../../../shared/footer/pie.component';
import { FormularioAdministradorComponent } from './formulario-administrador/formulario-administrador.component';
import { FormularioMineroComponent } from './formulario-minero/formulario-minero.component';
import { MatIconModule } from '@angular/material/icon';
import { RegresarHomeComponent } from '../../../shared/regresar-home/regresar-home.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, MatIconModule, RegresarHomeComponent, PieComponent, FormularioAdministradorComponent, FormularioMineroComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  tipoUsuario: string = '';
}
