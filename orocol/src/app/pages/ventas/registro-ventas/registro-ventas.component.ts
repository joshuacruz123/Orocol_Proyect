import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { VentasService } from '../../../core/services/ventas.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { TokenService } from '../../../core/services/token.service';
import { MatIconModule } from '@angular/material/icon';
import { ProductosInterface } from '../../../core/interfaces/producto.interface';
import { ProductoService } from '../../../core/services/producto.service';

@Component({
  selector: 'app-registro-ventas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatIconModule],
  templateUrl: './registro-ventas.component.html',
  styleUrl: './registro-ventas.component.css'
})
export class RegistroVentasComponent implements OnInit {

  ventaForm!: FormGroup;
  productList: ProductosInterface[] = [];
  
  constructor(
    private ventaService: VentasService,
    private productoService: ProductoService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<RegistroVentasComponent>,
    private fb: FormBuilder
  ) {
    this.ventaForm = this.fb.group({
      TipoOro: [null, Validators.required],
      fechaExtraccionOro: [null, Validators.required],
      precioOro: [null, Validators.required],
      cantidad: [null, Validators.required],
    });
  }

  cancelar() {
    this.dialogRef.close(false);
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

  crearVenta() {
    const user = this.tokenService.getUser();
    const { TipoOro } = this.ventaForm.value;
    if (user && user.IdMinero) {
      const IdMinero = user.IdMinero;
      console.log(this.ventaForm.value);
      this.ventaService.registrarVenta(IdMinero, TipoOro, this.ventaForm.value).subscribe(
        response => {
          this.toastr.success(response.message, 'OK', {
            timeOut: 6000
          });
        },
        error => {
          console.error('Error al registrar', error);
          this.toastr.error(error.error.message, 'Error:', {
            timeOut: 3000
          });
        }
      );
    } else {
      console.error('El usuario actual no es un minero.');
    }
  }
}
