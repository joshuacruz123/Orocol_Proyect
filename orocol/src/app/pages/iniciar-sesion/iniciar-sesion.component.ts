import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PieComponent } from '../pie/pie.component';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PieComponent],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
 
}
