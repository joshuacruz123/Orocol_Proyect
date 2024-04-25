import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasInterface } from '../../../core/interfaces/venta.interface';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { VentasService } from '../../../core/services/ventas.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-venta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './editar-venta.component.html',
  styleUrl: './editar-venta.component.css'
})

export class EditarVentaComponent implements OnInit {

  idGestionVenta!: number;
  ventas: VentasInterface = { 
    idGestionVenta: 0,
    fechaExtraccionOro: new Date(),
    precioOro: 0,
    cantidad: 0,
    estadoVenta: '',
    producto: { IdProducto: 0, TipoOro: '', estadoProducto: '' }
  }; 
  ventaForm!: FormGroup;
  
  constructor(
    public ventaService: VentasService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditarVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idGestionVenta: number }
  ) {
    this.idGestionVenta = data.idGestionVenta;
  }

  ngOnInit(): void {
    this.ventaService.consultarVenta(this.idGestionVenta).subscribe((data: VentasInterface)=>{
      this.ventas = data;
      // Inicialización del formulario dentro del bloque subscribe
      this.ventaForm = new FormGroup({
        fechaExtraccionOro: new FormControl(this.ventas.fechaExtraccionOro, [Validators.required]),
        precioOro: new FormControl(this.ventas.precioOro, Validators.required),
        cantidad: new FormControl(this.ventas.cantidad, Validators.required)
      });
    }); 
  }

  get f(){
    return this.ventaForm.controls;
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  editarVenta(){
    console.log(this.ventaForm.value);
    this.ventaService.editarVenta(this.idGestionVenta, this.ventaForm.value).subscribe(
      response => {
        this.toastr.success(response.message, 'OK', {
          timeOut: 3000
        });
        this.dialogRef.close(true); // Cierra el diálogo con éxito
      },
      error => {
        console.error('Error al editar la venta', error);
        this.toastr.error(error.error.message, 'Error:', {
          timeOut: 3000
        });
      }
    )
  }
}
