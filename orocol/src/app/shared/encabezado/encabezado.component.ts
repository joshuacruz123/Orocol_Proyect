import { Component } from '@angular/core';
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
export class EncabezadoComponent {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }
    
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
