import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../shared/encabezado/encabezado.component';
import { NavMineroComponent } from '../../shared/navbar-usuarios/nav-minero.component';
import { MatIconModule } from '@angular/material/icon';
import { VentasInterface } from '../../core/interfaces/venta.interface';
import { VentasService } from '../../core/services/ventas.service';
import { MatDialog } from '@angular/material/dialog';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import { RegistroVentasComponent } from './registro-ventas/registro-ventas.component';

@Component({
  selector: 'app-ventas-mineros',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavMineroComponent, PieComponent, MatIconModule],
  templateUrl: './ventas-mineros.component.html',
  styleUrl: './ventas-mineros.component.css'
})
export class VentasMinerosComponent {

  ventaList: VentasInterface[] = [];
  sinLista = undefined;
  ventaListFiltro: VentasInterface[] = [];

  constructor(
    private ventaService: VentasService,
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

  agregarVenta() {
    const dialogRef = this.dialog.open(RegistroVentasComponent, {
      width: '550px',
      disableClose: true,
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
}
