import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../shared/encabezado/encabezado.component';
import { NavAdminComponent } from '../../shared/navbar-usuarios/nav-admin.component';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { ComprasInterface } from '../../core/interfaces/compra.interface';
import { CompraService } from '../../core/services/compra.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarCompraComponent } from './registrar-compra/registrar-compra.component';
import { EditarCompraComponent } from './editar-compra/editar-compra.component';
import { DetalleCompraComponent } from './detalle-compra/detalle-compra.component';
import autoTable, { CellInput } from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ReporteComprasInterface } from '../../core/interfaces/reporte-compra.interface';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavAdminComponent, PieComponent, MatIconModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css'
})
export class ComprasComponent {

  compraList: ComprasInterface[] = [];
  sinLista = undefined;

  constructor(
    private compraService: CompraService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.consultarCompras();
  }

  consultarCompras() {
    this.compraService.consultarCompras().subscribe({
      next: (result) => {
        this.compraList = result;
      },
      error: (err) => {
        console.log(err);
      }
    });
  } // Función para ver las Compras

  inactivarCompra(IdCliente: number) {
    const estado = 'En proceso';
    let desactivarCompra;
    do {
      desactivarCompra = confirm("¿Deseas inactivar esta compra?, si lo hace la compra quédará terminada y no se podrá cambiar.");
      if (desactivarCompra) {
        this.compraService.terminarCompra(IdCliente, estado).subscribe({
          next: () => {
            this.toastr.success('Compra inactivada correctamente');
            this.consultarCompras(); // Actualizar la lista de Compras después de inactivar un Compra
          },
          error: (err) => {
            console.log(err);
            this.toastr.error('Error al inactivar la compra');
          }
        });
      } else {
        break;
      }
    } while (!desactivarCompra);
  } // Función para inactivar Compra

  agregarCompra(idGestion_Compra?: number) {
    const dialogRef = this.dialog.open(RegistrarCompraComponent, {
      width: '550px',
      disableClose: true,
      data: { idGestion_Compra: idGestion_Compra }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consultarCompras();
      }
    });
  }

  editarCompra(IdCliente?: number) {
    const dialogRef = this.dialog.open(EditarCompraComponent, {
      width: '550px',
      disableClose: true,
      data: { IdCliente: IdCliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consultarCompras();
      }
    });
  }

  detalleCompra(IdCliente?: number) {
    const dialogRef = this.dialog.open(DetalleCompraComponent, {
      width: '550px',
      disableClose: true,
      data: { IdCliente: IdCliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consultarCompras();
      }
    });
  }

  /* Código para generar reportes*/
  convertirDatos(data: ReporteComprasInterface[]): CellInput[][] {
    return data.map(reporte => [
      reporte.salidaVentas.entrada.producto.TipoOro,
      reporte.NombreCompleto,
      reporte.Empresa,
      reporte.Pais,
      reporte.CiudadMunicipio,
      reporte.FechaExportacion,
      reporte.salidaVentas.PesogrOro,
      reporte.estadoCompra,
    ]);
  }

  generarTabla(pdf: jsPDF, data: ReporteComprasInterface[], y: number) { 
    const fechaActualTexto = new Date().toLocaleDateString('es-ES');
    pdf.addImage(
      `/assets/images/orocol-reportes.png`,
      pdf.internal.pageSize.getWidth() - 70, 5, 60, 14
    ); 
    pdf.text(`Reporte de compras - ${fechaActualTexto}:`, pdf.internal.pageSize.getWidth() / 2, y - 5, { align: 'center' });
    pdf.setFontSize(12);
    const headers = ['Producto comprado', 'Nombre del comprador', 'Empresa', 'País', 'Ciudad/Municipio', 'Fecha de exportacion', 'Peso oro', 'Estado compra'];
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
    this.compraService.generarReporteCompra().subscribe((reportes: ReporteComprasInterface[]) => {
      console.log('Reportes recibidos:', reportes);
      const pdf = new jsPDF();
      let y = 20;
      if (reportes && reportes.length > 0) {
        
        this.generarTabla(pdf, reportes, y + 10);
        const fechaActual = new Date().toLocaleDateString('es-ES').replace(/\//g, '-');
        const nombreArchivo = `reporte_compras_${fechaActual}.pdf`;
        pdf.save(nombreArchivo);
      } else {
        console.error('No se recibieron reportes válidos.');
      }
    }, error => {
      console.error('Error al obtener los reportes:', error);
    });
  }
}
 