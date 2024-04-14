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
import { MatDialog } from '@angular/material/dialog';
import { EditarVentaComponent } from './editar-venta/editar-venta.component';
import { DetalleVentaComponent } from './detalle-venta/detalle-venta.component';
import { RegistroVentasAdminComponent } from './registro-ventas/registro-ventas-admin.component';
import { jsPDF } from 'jspdf';
import autoTable, { CellInput } from 'jspdf-autotable';
import { ReporteVentasInterface } from '../../core/interfaces/reporte-venta.interface';

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

  /* Código para generar reportes*/

  convertirDatos(data: ReporteVentasInterface[]): CellInput[][] {
    return data.map(reporte => [
      `${reporte.minero.usuario.nombreUsuario} ${reporte.minero.usuario.apellidosUsuario}`,
      reporte.minero.usuario.correoUsuario,
      reporte.minero.tipo_documento,
      reporte.minero.numero_documento,
      reporte.minero.telefono,
      reporte.producto.TipoOro,
      reporte.fechaExtraccionOro,
      reporte.precioOro,
      reporte.cantidad
    ]);
  }

  generarTabla(pdf: jsPDF, data: ReporteVentasInterface[], y: number) { 
    const fechaActualTexto = new Date().toLocaleDateString('es-ES');
    pdf.addImage(
      `/assets/images/orocol-reportes.png`,
      pdf.internal.pageSize.getWidth() - 70, 5, 60, 14
    ); 
    pdf.text(`Reporte de ventas - ${fechaActualTexto}:`, pdf.internal.pageSize.getWidth() / 2, y - 5, { align: 'center' });
    pdf.setFontSize(12);
    const headers = ['Nombre de usuario minero', 'Correo', 'Tipo documento', 'Número documento', 'Teléfono', 'Producto', 'Fecha extracción de oro', 'Precio', 'Cantidad oro'];
    autoTable(pdf, {
      startY: y,
      head: [headers],
      body: this.convertirDatos(data),
      theme: 'striped',
      headStyles: {
        fillColor: [22, 22, 22],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10,
      },
      bodyStyles: {
        textColor: [0, 0, 0],
        fontSize: 9,
        minCellWidth: 21,
      },
      tableWidth: 'auto',
      styles: {
        minCellWidth: 21,
        cellPadding: 1,
        lineWidth: 0.2,
      },
    });
    const bottomMargin = 30;
    const leftMargin = 20;
    const firmaY = pdf.internal.pageSize.getHeight() - bottomMargin;
    pdf.text('Firma: ______________________ .', leftMargin, firmaY);
  }
// 181, 127, 1
  generarReporte() {
    this.ventaService.generarReporteVenta().subscribe((reportes: ReporteVentasInterface[]) => {
      console.log('Reportes recibidos:', reportes);
      const pdf = new jsPDF();
      let y = 20;
      if (reportes && reportes.length > 0) {
        
        this.generarTabla(pdf, reportes, y + 10);
        const fechaActual = new Date().toLocaleDateString('es-ES').replace(/\//g, '-');
        const nombreArchivo = `reporte_ventas_${fechaActual}.pdf`;
        pdf.save(nombreArchivo);
      } else {
        console.error('No se recibieron reportes válidos.');
      }
    }, error => {
      console.error('Error al obtener los reportes:', error);
    });
  }     
}
