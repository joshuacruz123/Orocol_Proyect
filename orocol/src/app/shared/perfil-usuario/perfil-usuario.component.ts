import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';
import { TokenService } from '../../core/services/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterOutlet],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit {

  perfil: any;
  fotoPerfil: File | null = null;
  imagenPerfilUrl: string = '/assets/images/perfil.jpg';
  mostrarCambiarFoto: boolean = false;
  imagenPreviaUrl: string | ArrayBuffer | null = null; 

  constructor( 
    public usuarioService: UsuarioService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    const user = this.tokenService.getUser();
    if (user && user.idUsuario) {
      this.usuarioService.consultarPerfil(user.idUsuario).subscribe(
        (data: any) => {
          this.imagenPerfilUrl = data.fotoPerfilUrl || this.imagenPerfilUrl;
          this.mostrarCambiarFoto = !!data.fotoPerfilUrl;
        },
        (error) => {
          console.error('Error al obtener el perfil del usuario:', error);
        }
      );
    }
  }

  onFileSelect(event: any) {
    this.fotoPerfil = event.target.files[0];
    if (this.fotoPerfil) {
      // Crear URL de objeto para previsualizar imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreviaUrl = reader.result;
      };
      reader.readAsDataURL(this.fotoPerfil);
    }
  }

  subirFoto() {
    if (this.fotoPerfil) {
      const user = this.tokenService.getUser();
      if (user && user.idUsuario) {
        const idUsuario = user.idUsuario;
        this.usuarioService.subirFotoPerfil(idUsuario, this.fotoPerfil).subscribe(
          (data) => {
            this.toastr.success('Por favor reinicia la página para ver la foto de perfil', 'Foto subida correctamente',
              { timeOut: 6000 });
            this.mostrarCambiarFoto = true;
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
