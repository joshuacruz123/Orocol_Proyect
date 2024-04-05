import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../shared/encabezado/encabezado.component';
import { NavAdminComponent } from '../../shared/navbar-usuarios/nav-admin.component';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { VentasInterface } from '../../core/interfaces/venta.interface';
import { VentasService } from '../../core/services/ventas.service';
import { ProductosInterface } from '../../core/interfaces/producto.interface';
import { MatDialog } from '@angular/material/dialog';
import { RegistroVentasComponent } from './registro-ventas/registro-ventas.component';
import { EditarVentaComponent } from './editar-venta/editar-venta.component';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavAdminComponent, PieComponent, MatIconModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {

  ventaList: VentasInterface[] = [];
  sinLista = undefined;
  ventaListFiltro: VentasInterface[] = [];
  // producto: ProductosInterface[] = [];

  constructor(
    private ventaService: VentasService,
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
      (venta.fechaExtraccionOro instanceof Date && venta.fechaExtraccionOro.toLocaleString().toLowerCase().includes(busqueda)) || //Error: Property 'toLowerCase' does not exist on type 'Date'.ts(2339)
      venta.cantidad.toString().toLowerCase().includes(busqueda) || //Error: Property 'toLowerCase' does not exist on type 'number'.ts(2339)
      venta.precioOro.toString().toLowerCase().includes(busqueda) //Error: Property 'toLowerCase' does not exist on type 'number'.ts(2339)
    );
  }

  inactivarVenta(id: number) {
    const nuevoEstado = 'Disponible';
    let desactivarventa;
    do {
      desactivarventa = confirm("¿Deseas inactivar este venta?, si lo hace este venta no se va a vender.");
      if (desactivarventa) {
        this.ventaService.inactivarVenta(id, nuevoEstado).subscribe({
          next: () => {
            this.toastr.success('venta inactivado correctamente');
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
    const nuevoEstado = 'Disponible';
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
    const dialogRef = this.dialog.open(RegistroVentasComponent, {
      width: '550px', 
      disableClose: true, 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
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
      if(result) {
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
      if(result) {
        this.consultarVentas();
      }
    });
  }
}
