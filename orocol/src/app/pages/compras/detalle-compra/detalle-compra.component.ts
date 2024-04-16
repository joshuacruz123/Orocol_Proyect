import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompraService } from '../../../core/services/compra.service';
import { ComprasInterface } from '../../../core/interfaces/compra.interface';

@Component({
  selector: 'app-detalle-compra',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './detalle-compra.component.html',
  styleUrl: './detalle-compra.component.css'
})
export class DetalleCompraComponent implements OnInit{

  IdCliente!: number;
  compra!: ComprasInterface;
  
  constructor(
    public compraService: CompraService,
    public dialogRef: MatDialogRef<DetalleCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { IdCliente: number }
  ) {
    this.IdCliente = data.IdCliente;
  }

  ngOnInit(): void {
    const id = this.IdCliente;
    if (id) {
      this.compraService.consultarCompra(id).subscribe(
        (data: ComprasInterface) => { 
          this.compra = data;
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
