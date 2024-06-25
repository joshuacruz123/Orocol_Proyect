import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterOutlet],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent implements OnInit{

  imagenPerfilUrl: string = '/assets/images/perfil.jpg'; // Foto de perfil predeterminada
  nombreUsuario: string = ''; // Variable para el nombre de usuario
  apellidosUsuario: string = '';

  constructor(
    public usuarioService: UsuarioService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.tokenService.getUser();
    if (user && user.idUsuario) {
      this.usuarioService.consultarPerfil(user.idUsuario).subscribe(
        (data: any) => {
          this.imagenPerfilUrl = data.fotoPerfilUrl || this.imagenPerfilUrl;
          this.nombreUsuario = data.usuario.nombreUsuario;
          this.apellidosUsuario= data.usuario.apellidosUsuario;
        },
        (error) => {
          console.error('Error al obtener el perfil del usuario:', error);
        }
      );
    }
  }
    
  cerrar(): void {
    this.tokenService.logOut();
    this.router.navigate(['/iniciar_sesion']);
  }
}
 