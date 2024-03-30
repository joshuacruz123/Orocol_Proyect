import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { PieComponent } from '../../../shared/footer/pie.component';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../../core/services/usuario.service';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../../core/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { RegresarHomeComponent } from '../../../shared/regresar-home/regresar-home.component';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, PieComponent, RegresarHomeComponent, MatIconModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {

  correoUsuario: string = '';
  passwordUsuario: string = '';

  roles: string ='';

  constructor(
    private usuarioService: UsuarioService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  iniciarSesion() {
    this.usuarioService.login(this.correoUsuario, this.passwordUsuario).subscribe(
      (response) => {
        //console.log('JWT:', response.token);
        if (!response.token) {
          this.toastr.error(response.error.message, 'Error', {
            timeOut: 3000
          });
        } else {
          this.tokenService.setToken(response.token);
          const rolUsuario = this.tokenService.isRoles();
          const rol = this.roles = rolUsuario.roles;
          if (rol.indexOf('Minero') >= 0) {
            this.router.navigate(['/minero']);
          } else if (rol.indexOf('Administrador') >= 0) {
            this.router.navigate(['/administrador']);
          }
        }
      },
      err => {
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 3000
        });
      }
    );
  }  
}
