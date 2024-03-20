import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reporte-compras',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './reporte-compras.component.html',
  styleUrl: './reporte-compras.component.css'
})
export class ReporteComprasComponent {

}
