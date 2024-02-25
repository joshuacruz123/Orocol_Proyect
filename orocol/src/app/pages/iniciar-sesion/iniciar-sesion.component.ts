import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PieComponent } from '../pie/pie.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PieComponent, MatIconModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
 
}
