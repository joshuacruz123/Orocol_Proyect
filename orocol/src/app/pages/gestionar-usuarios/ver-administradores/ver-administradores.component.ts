import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../../shared/encabezado/encabezado.component';
import { NavAdminComponent } from '../../../shared/navbar-usuarios/nav-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { GestionUsuariosService } from '../../../core/services/gestion-usuarios.service';
import { AdministradorInterface } from '../../../core/interfaces/administrador.interface';

@Component({
  selector: 'app-ver-administradores',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavAdminComponent, PieComponent, MatIconModule],
  templateUrl: './ver-administradores.component.html',
  styleUrl: './ver-administradores.component.css'
})
export class VerAdministradoresComponent {
  
  administrador: AdministradorInterface[] = [];
  sinLista = undefined;
  administradorFiltro: AdministradorInterface[] = [];
  imagenPerfilUrl: string = '/assets/images/perfil.jpg';

  constructor(
    private gestionUsuarios: GestionUsuariosService,
  ) { }

  ngOnInit(): void {
    this.consultarAdmins();
  }

  consultarAdmins() {
    this.gestionUsuarios.consultarAdministradores().subscribe({
      next: (result) => {
        this.administrador = result;
      },
      error: (err) => {
        console.log(err);
      }
    });
  } // Función para ver lss administradores

  obtenerFotoPerfil(fotoPerfil: string | undefined): string {
    return fotoPerfil || this.imagenPerfilUrl;
  }
}
