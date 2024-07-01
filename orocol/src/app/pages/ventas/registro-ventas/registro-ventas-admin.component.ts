import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { VentasService } from '../../../core/services/ventas.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProductosInterface } from '../../../core/interfaces/producto.interface';
import { ProductoService } from '../../../core/services/producto.service';

@Component({
  selector: 'app-registro-ventas-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatIconModule],
  templateUrl: './registro-ventas-admin.component.html',
  styleUrl: './registro-ventas.component.css'
})
export class RegistroVentasAdminComponent implements OnInit {

  productList: ProductosInterface[] = [];
  ventaForm!: FormGroup;

  constructor(
    private ventaService: VentasService,
    private productoService: ProductoService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<RegistroVentasAdminComponent>,
    private fb: FormBuilder
  ) {
    this.ventaForm = this.fb.group({
      numero_documento: [null, Validators.required],
      TipoOro: [null, Validators.required],
      fechaExtraccionOro: [null, Validators.required],
      precioOro: [null, Validators.required],
      cantidad: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.consultarProductos();
  }
  
  consultarProductos() {
    this.productoService.consultarProductos().subscribe({
      next: (result) => {
        this.productList = result;
      },
      error: (err) => {
        console.log(err);
      }
    });
  } 

  cancelar() {
    this.dialogRef.close(false);
  }

  crearVenta() {
    const { numero_documento, TipoOro } = this.ventaForm.value;
    console.log(this.ventaForm.value);
    this.ventaService.registrarVentaAdmin(numero_documento, TipoOro, this.ventaForm.value).subscribe(
      response => {
        this.dialogRef.close(true);
        this.toastr.success(response.message, 'OK', {
          timeOut: 3000 
        });
      },
      error => {
        console.error('Error al registrar', error);
        this.toastr.error(error.error.message, 'Error:', {
          timeOut: 3000
        });
      }
    )
  }
}
