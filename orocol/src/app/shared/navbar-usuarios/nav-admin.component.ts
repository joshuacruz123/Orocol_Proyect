import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-nav-admin',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterOutlet],
  templateUrl: './nav-admin.component.html',
  styleUrl: './navbar-usuarios.component.css'
})
export class NavAdminComponent {

  constructor(
    public usuarioService: UsuarioService,
    private tokenService: TokenService,
    private router: Router
  ) { }
    
  cerrar(): void {
    this.tokenService.logOut();
    this.router.navigate(['/iniciar_sesion'])
  }
}
