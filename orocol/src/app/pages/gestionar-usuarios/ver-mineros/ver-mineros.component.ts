import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../../shared/encabezado/encabezado.component';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MineroInterface } from '../../../core/interfaces/minero.interface';
import { GestionUsuariosService } from '../../../core/services/gestion-usuarios.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { EditarUsuariosMinerosComponent } from '../editar-usuarios-mineros/editar-usuarios-mineros.component';
import { DetalleMineroComponent } from './detalle-minero.component';
import { NavAdminComponent } from '../../../shared/navbar-usuarios/nav-admin.component';
import { RegistrarMinerosComponent } from './registrar-mineros.component';

@Component({
  selector: 'app-ver-mineros',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavAdminComponent, PieComponent, MatIconModule],
  templateUrl: './ver-mineros.component.html',
  styleUrl: './ver-mineros.component.css'
})
export class VerMinerosComponent {

  mineros: MineroInterface[] = [];
  sinLista = undefined;
  minerosFiltro: MineroInterface[] = [];
  imagenPerfilUrl: string = '/assets/images/perfil.jpg';

  constructor(
    private gestionUsuarios: GestionUsuariosService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.consultarMineros();
  }

  consultarMineros() {
    this.gestionUsuarios.consultarMineros().subscribe({
      next: (result) => {
        
        this.mineros = result;
        this.minerosFiltro = [...this.mineros];
      },
      error: (err) => {
        console.log(err);
      }
    });
  } // Función para ver las Mineros

  obtenerFotoPerfil(fotoPerfil: string | undefined): string {
    return fotoPerfil || this.imagenPerfilUrl;
  }

  buscarMineros(event: any) {
    const busqueda = event?.target?.value.trim().toLowerCase() || '';
    this.minerosFiltro = this.mineros.filter(minero =>
      minero.usuario.nombreUsuario.toLowerCase().includes(busqueda) ||
      minero.usuario.apellidosUsuario.toLowerCase().includes(busqueda) ||
      minero.numero_documento.toString().toLowerCase().includes(busqueda)
    );
  }

  agregarMineos() {
    const dialogRef = this.dialog.open(RegistrarMinerosComponent, {
      width: '550px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.consultarMineros();
      }
    });
  }

  inactivarMinero(id: number) {
    const estado = 'activo';
    let desactivarMinero;
    do {
      desactivarMinero = confirm("¿Deseas inactivar este usuario?, si lo hace el usuario NO podrá iniciar sesión.");
      if (desactivarMinero) {
        this.usuarioService.inactivarCuenta(id, estado).subscribe({
          next: () => {
            this.toastr.success('Minero inactivada correctamente');
            this.consultarMineros(); // Actualizar la lista de Mineros después de inactivar un Minero
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('Error al inactivar el Minero');
          }
        });
      } else {
        break;
      }
    } while (!desactivarMinero);
  } // Función para inactivar Minero

  activarMinero(id: number) {
    const nuevoEstado = 'activo';
    let activarMinero;
    do {
      activarMinero = confirm("¿Deseas reactivar este usuario?, si lo hace el usuario va a poder iniciar sesión.");
      if (activarMinero) {
        this.gestionUsuarios.activarUsuario(id, nuevoEstado).subscribe({
          next: () => {
            this.toastr.success('Minero activado correctamente');
            this.consultarMineros();
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('Error al inactivar el Minero');
          }
        });
      } else {
        break;
      }
    } while (!activarMinero);
  } // Función para activar Minero

  editarMinero(IdMinero?: number) {
    const dialogRef = this.dialog.open(EditarUsuariosMinerosComponent, {
      width: '550px',
      disableClose: true,
      data: { IdMinero: IdMinero }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consultarMineros();
      }
    });
  } /*
"cargoAdmin": "string",
"nombreUsuario": "string",
"apellidosUsuario": "string",
"correoUsuario": "string",
"passwordUsuario": "string"

"tipo_documento": "Cedula de ciudadania",
"numero_documento": 10,
"telefono": 10,
"fecha_nacimiento": "2024-04-24T17:34:01.872Z",
"direccion_vivienda": "string",
"cambio_documento": "No acepto",
"nombreUsuario": "string",
"apellidosUsuario": "string",
"correoUsuario": "string",
"passwordUsuario": "string"
*/

  detalleMinero(IdMinero?: number) {
    const dialogRef = this.dialog.open(DetalleMineroComponent, {
      width: '500px',
      disableClose: true,
      data: { IdMinero: IdMinero }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consultarMineros();
      }
    });
  }
}
