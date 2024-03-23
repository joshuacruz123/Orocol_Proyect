import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../shared/encabezado/encabezado.component';
import { NavAdminComponent } from '../../shared/navbar-usuarios/nav-admin.component';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavAdminComponent, PieComponent, MatIconModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {

}
