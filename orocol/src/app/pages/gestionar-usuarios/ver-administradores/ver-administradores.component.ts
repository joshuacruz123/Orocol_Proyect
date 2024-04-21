import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../../shared/encabezado/encabezado.component';
import { NavAdminComponent } from '../../../shared/navbar-usuarios/nav-admin.component';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { GestionUsuariosService } from '../../../core/services/gestion-usuarios.service';
import { MineroInterface } from '../../../core/interfaces/minero.interface';
import { UsuarioService } from '../../../core/services/usuario.service';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-ver-administradores',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavAdminComponent, PieComponent, MatIconModule],
  templateUrl: './ver-administradores.component.html',
  styleUrl: './ver-administradores.component.css'
})
export class VerAdministradoresComponent {
/*
  ventaList: MineroInterface[] = [];
  sinLista = undefined;
  ventaListFiltro: MineroInterface[] = [];

  constructor(
    private gestionUsuarios: GestionUsuariosService,
    private usuarioService: UsuarioService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.consultarVentas();
  }

  consultarVentas() {
    this.ventaService.consultarVentas().subscribe({
      next: (result) => {
        this.ventaList = result;
        this.ventaListFiltro = [...this.ventaList];
      },
      error: (err) => {
        console.log(err);
      }
    });
  } // Función para ver las ventas

  buscarVenta(event: any) {
    const busqueda = event?.target?.value.trim().toLowerCase() || '';
    this.ventaListFiltro = this.ventaList.filter(venta =>
      venta.estadoVenta.toLowerCase().includes(busqueda) ||
      (venta.fechaExtraccionOro instanceof Date && venta.fechaExtraccionOro.toLocaleString().toLowerCase().includes(busqueda)) ||
      venta.cantidad.toString().toLowerCase().includes(busqueda) || 
      venta.precioOro.toString().toLowerCase().includes(busqueda) 
    );
  }

  inactivarVenta(idGestionVenta: number) {
    const estado = 'Activo';
    let desactivarventa;
    do {
      desactivarventa = confirm("¿Deseas inactivar este venta?, si lo hace este venta no se va a vender.");
      if (desactivarventa) {
        this.ventaService.inactivarVenta(idGestionVenta, estado).subscribe({
          next: () => {
            this.toastr.success('venta inactivada correctamente');
            this.consultarVentas(); // Actualizar la lista de ventas después de inactivar un venta
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('Error al inactivar el venta');
          }
        });
      } else {
        break;
      }
    } while (!desactivarventa);
  } // Función para inactivar venta

  activarVenta(id: number) {
    const nuevoEstado = 'Activo';
    let activarventa;
    do {
      activarventa = confirm("¿Deseas activar este venta?, si lo hace este venta va a estar disponible a la venta.");
      if (activarventa) {
        this.ventaService.activarVenta(id, nuevoEstado).subscribe({
          next: () => {
            this.toastr.success('venta activado correctamente');
            this.consultarVentas();
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('Error al inactivar el venta');
          }
        });
      } else {
        break;
      }
    } while (!activarventa);
  } // Función para activar venta

  agregarVenta() {
    const dialogRef = this.dialog.open(RegistroVentasAdminComponent, {
      width: '550px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.consultarVentas();
      }
    });
  }

  agregarCompra(idGestionVenta?: number) {
    const dialogRef = this.dialog.open(RegistrarCompraComponent, {
      width: '550px',
      disableClose: true,
      data: { idGestionVenta: idGestionVenta }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consultarVentas();
      }
    });
  }

  editarVenta(idGestionVenta?: number) {
    const dialogRef = this.dialog.open(EditarVentaComponent, {
      width: '550px',
      disableClose: true,
      data: { idGestionVenta: idGestionVenta }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consultarVentas();
      }
    });
  }

  detalleVenta(idGestionVenta?: number) {
    const dialogRef = this.dialog.open(DetalleVentaComponent, {
      width: '550px',
      disableClose: true,
      data: { idGestionVenta: idGestionVenta }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consultarVentas();
      }
    });
  }
*/
}
