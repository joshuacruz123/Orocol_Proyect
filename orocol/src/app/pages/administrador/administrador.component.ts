import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../shared/footer/pie.component';
import { TokenService } from '../../core/services/token.service';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../core/services/usuario.service';
import { NavAdminComponent } from '../../shared/navbar-usuarios/nav-admin.component';
import { EncabezadoComponent } from '../../shared/encabezado/encabezado.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, EncabezadoComponent, PieComponent, NavAdminComponent, MatIconModule, RouterLink, RouterOutlet],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent implements OnInit{

  administrador: any;
  perfil: any;
  fotoPerfil: File | null = null;

  constructor(
    public usuarioService: UsuarioService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    const user = this.tokenService.getUser();
    if (user && user.idAdmin) {
      const idAdmin = user.idAdmin;
      this.usuarioService.consultarAdministrador(idAdmin).subscribe(
        (data) => {
          this.administrador = data;
        },
        (error) => {
          console.error('Error al obtener los datos del administrador:', error);
        }
      );
    } else {
      console.error('El usuario actual no es un administrador.');
    }
  }

  onFileSelect(event: any) {
    this.fotoPerfil = event.target.files[0];
  }

  subirFoto() {
    if (this.fotoPerfil) {
      const user = this.tokenService.getUser();
      if (user && user.idUsuario) {
        const idUsuario = user.idUsuario;
        this.usuarioService.subirFotoPerfil(idUsuario, this.fotoPerfil).subscribe(
          (data) => {
            this.toastr.success('Foto subida correctamente');
          },
          (error) => {
            this.toastr.error('Error al subir la foto de perfil');
            console.error('Error al subir la foto de perfil:', error);
          }
        );
      }
    }
  }
}
