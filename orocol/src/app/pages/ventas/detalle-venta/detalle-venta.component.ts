import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasInterface } from '../../../core/interfaces/venta.interface';
import { VentasService } from '../../../core/services/ventas.service';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-venta',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './detalle-venta.component.html',
  styleUrl: './detalle-venta.component.css'
})
export class DetalleVentaComponent implements OnInit{

  idGestionVenta!: number;
  venta!: VentasInterface;
  
  constructor(
    public ventaService: VentasService,
    public dialogRef: MatDialogRef<DetalleVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idGestionVenta: number }
  ) {
    this.idGestionVenta = data.idGestionVenta;
  }

  ngOnInit(): void {
    const id = this.idGestionVenta;
    if (id) {
      this.ventaService.consultarVenta(id).subscribe(
        (data: VentasInterface) => { 
          this.venta = data;
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    } else {
      console.error('No existe.');
    }
  } 
  
  cancelar() {
    this.dialogRef.close(false);
  }
}
