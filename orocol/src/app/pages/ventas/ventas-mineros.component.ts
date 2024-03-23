import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../shared/encabezado/encabezado.component';
import { NavMineroComponent } from '../../shared/navbar-usuarios/nav-minero.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ventas-mineros',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavMineroComponent, PieComponent, MatIconModule],
  templateUrl: './ventas-mineros.component.html',
  styleUrl: './ventas-mineros.component.css'
})
export class VentasMinerosComponent {

}
