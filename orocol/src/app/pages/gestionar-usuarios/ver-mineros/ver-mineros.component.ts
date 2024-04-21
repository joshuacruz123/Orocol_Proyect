import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../../shared/encabezado/encabezado.component';
import { NavMineroComponent } from '../../../shared/navbar-usuarios/nav-minero.component';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MineroInterface } from '../../../core/interfaces/minero.interface';
import { GestionUsuariosService } from '../../../core/services/gestion-usuarios.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { EditarUsuariosMinerosComponent } from '../editar-usuarios-mineros/editar-usuarios-mineros.component';
import { DetalleMineroComponent } from './detalle-minero.component';

@Component({
  selector: 'app-ver-mineros',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavMineroComponent, PieComponent, MatIconModule],
  templateUrl: './ver-mineros.component.html',
  styleUrl: './ver-mineros.component.css'
})
export class VerMinerosComponent {

  mineros: MineroInterface[] = [];
  sinLista = undefined;
  minerosFiltro: MineroInterface[] = [];

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

  buscarMineros(event: any) {
    const busqueda = event?.target?.value.trim().toLowerCase() || '';
    this.minerosFiltro = this.mineros.filter(minero =>
      minero.usuario.nombreUsuario.toLowerCase().includes(busqueda) ||
      minero.usuario.apellidosUsuario.toLowerCase().includes(busqueda) ||
      minero.numero_documento.toString().toLowerCase().includes(busqueda)
    );
  }

  inactivarMinero(IdMinero: number) {
    const estado = 'Activo';
    let desactivarMinero;
    do {
      desactivarMinero = confirm("¿Deseas inactivar este Minero?, si lo hace este Minero no se va a vender.");
      if (desactivarMinero) {
        this.usuarioService.inactivarCuenta(IdMinero, estado).subscribe({
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
    const nuevoEstado = 'Activo';
    let activarMinero;
    do {
      activarMinero = confirm("¿Deseas activar este Minero?, si lo hace este Minero va a estar disponible a la Minero.");
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
  }

  detalleMinero(IdMinero?: number) {
    const dialogRef = this.dialog.open(DetalleMineroComponent, {
      width: '550px',
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
