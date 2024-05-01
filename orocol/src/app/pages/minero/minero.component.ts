import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../shared/encabezado/encabezado.component';
import { NavMineroComponent } from '../../shared/navbar-usuarios/nav-minero.component';
import { MatIconModule } from '@angular/material/icon';
import { TokenService } from '../../core/services/token.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { PerfilUsuarioComponent } from '../../shared/perfil-usuario/perfil-usuario.component';
import { MineroInterface } from '../../core/interfaces/minero.interface';
import { ToastrService } from 'ngx-toastr';
import { EditarPasswordComponent } from '../../shared/editar-password/editar-password.component';

@Component({
  selector: 'app-minero',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavMineroComponent, PerfilUsuarioComponent, EditarPasswordComponent, PieComponent, MatIconModule],
  templateUrl: './minero.component.html',
  styleUrl: './minero.component.css'
})
export class MineroComponent implements OnInit{

  minero!: MineroInterface;

  constructor(
    public usuarioService: UsuarioService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    const user = this.tokenService.getUser();
    if (user && user.IdMinero) {
      const IdMinero = user.IdMinero;
      this.usuarioService.consultarMinero(IdMinero).subscribe(
        (data: MineroInterface) => {
          this.minero = data;
        },
        (error) => {
          console.error('Error al obtener los datos del minero:', error);
        }
      );
    } else {
      console.error('El usuario actual no es un minero.');
    }
  }

  inactivarUsuarioPropio(id: number) {
    const estado = 'activo';
    let desactivarUsuario;
    do {
      desactivarUsuario = confirm("¿Deseas inactivar tu propia cuenta?");
      if (desactivarUsuario) {
        desactivarUsuario = confirm("Si lo hace NO va a poder iniciar sesión.");
        if (desactivarUsuario) {
          this.usuarioService.inactivarCuenta(id, estado).subscribe({
            next: () => {
              this.router.navigate(['/']);
              this.toastr.success('Tu cuenta a sido inactivada con exito');
              alert("Si deseas volver a iniciar sesión, solicita tu reactivación en ...");
            },
            error: (err) => {
              console.log(err);
              this.toastr.error('Error al inactivar el Minero');
            }
          });
        } else {
          break;
        }
      } else {
        break;
      }
    } while (!desactivarUsuario);
  } // Función para inactivar usuario propio
}
