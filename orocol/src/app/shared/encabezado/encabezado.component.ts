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

  perfil: any;

  constructor(
    public usuarioService: UsuarioService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.tokenService.getUser();
    if (user && user.idUsuario) {
      const idUsuario = user.idUsuario;
      this.usuarioService.consultarPerfil(idUsuario).subscribe(
        (data) => {
          this.perfil = data;
        },
        (error) => {
          console.error('Error al obtener los datos del administrador:', error);
        }
      );
    } else {
      console.error('El usuario actual no es un administrador.');
    }
  }
    
  cerrar(): void {
    let terminarSesion;
    do {
        terminarSesion = confirm("¿Deseas terminar la sesión?");

        if (terminarSesion) {
            this.tokenService.logOut();
            this.router.navigate(['/iniciar_sesion'])
        } else {
            break;
        }
    } while (!terminarSesion); 
  }
}
 