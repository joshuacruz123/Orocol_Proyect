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
  
  administrador: any;

  constructor(
    public usuarioService: UsuarioService,
    private tokenService: TokenService,
    private router: Router
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
    
  cerrar(): void {
    this.tokenService.logOut();
    this.router.navigate(['/iniciar_sesion'])
  }
}
