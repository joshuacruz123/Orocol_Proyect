import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { VentasService } from '../../../core/services/ventas.service';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-registro-ventas-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './registro-ventas-admin.component.html',
  styleUrl: './registro-ventas-admin.component.css'
})
export class RegistroVentasAdminComponent {

  ventaForm!: FormGroup;

  constructor(
    private ventaService: VentasService,
    private toastr: ToastrService,
    private router: Router,
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

  cancelar() {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
  }

  crearVenta() {
    const { numero_documento, TipoOro } = this.ventaForm.value;
    console.log(this.ventaForm.value);
    this.ventaService.registrarVentaAdmin(numero_documento, TipoOro, this.ventaForm.value).subscribe(
      response => {
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
