import { Component } from '@angular/core';
import { ProductoService } from '../../../core/services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
//import { Productos } from '../../../models/productos';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {
 
  form!: FormGroup;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<CrearProductoComponent>,
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      TipoOro: new FormControl('', [Validators.required])
    });
  }

  get f(){
    return this.form.controls;
  }

  crearProducto(){
    this.productoService.registrarProducto(this.form.value).subscribe(
      response => {
        this.dialogRef.close(true);
        this.toastr.success(response.message, 'Producto registrado', {
          timeOut: 6000 
        });
      },
      error => {
        console.error('Error al registrar', error);
        this.toastr.error(error.error.message, 'Error:', {
          timeOut: 6000
        });
      }
    );
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
