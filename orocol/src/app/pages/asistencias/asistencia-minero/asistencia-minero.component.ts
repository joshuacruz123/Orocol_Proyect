import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../../shared/encabezado/encabezado.component';
import { MatIconModule } from '@angular/material/icon';
import { NavAdminComponent } from '../../../shared/navbar-usuarios/nav-admin.component';

@Component({
  selector: 'app-asistencia-minero',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavAdminComponent, PieComponent, MatIconModule],
  templateUrl: './asistencia-minero.component.html',
  styleUrl: './asistencia-minero.component.css'
})
export class AsistenciaMineroComponent {

}
