import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../shared/encabezado/encabezado.component';
import { NavAdminComponent } from '../../shared/navbar-usuarios/nav-admin.component';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { VerMinerosComponent } from './ver-mineros/ver-mineros.component';
import { VerAdministradoresComponent } from './ver-administradores/ver-administradores.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestionar-usuarios',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavAdminComponent, PieComponent, VerMinerosComponent, VerAdministradoresComponent, MatIconModule, FormsModule],
  templateUrl: './gestionar-usuarios.component.html',
  styleUrl: './gestionar-usuarios.component.css'
})
export class GestionarUsuariosComponent {
  tipoUsuario: string = '';
}
