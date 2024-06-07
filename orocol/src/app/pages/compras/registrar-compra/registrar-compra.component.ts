import { Component, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompraService } from '../../../core/services/compra.service';
import { TokenService } from '../../../core/services/token.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-registrar-compra',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, MatDialogModule],
  templateUrl: './registrar-compra.component.html',
  styleUrl: './registrar-compra.component.css'
})
export class RegistrarCompraComponent {

  idGestionVenta!: number;
  compraForm!: FormGroup;

  constructor(
    private compraService: CompraService,
    private tokenService: TokenService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<RegistrarCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idGestionVenta: number }
  ) {
    this.idGestionVenta = data.idGestionVenta;
    this.compraForm = this.fb.group({
      NombreCompleto: [null, Validators.required],
      Empresa: [null, Validators.required],
      Pais: [null, Validators.required],
      CiudadMunicipio: [null, Validators.required],
      FechaExportacion: [null, Validators.required],
      PesogrOro: [null, Validators.required]
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
  }

  crearCompra() {
    const user = this.tokenService.getUser();
    if (user && user.idAdmin) {
      const idAdmin = user.idAdmin;
      this.compraService.registrarCompra(this.idGestionVenta, idAdmin, this.compraForm.value).subscribe(
        response => {
          this.dialogRef.close(true);
          this.router.navigate(['/compras']);
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
      );
    } else {
      console.error('El usuario actual no es un administrador.');
    }
  }
}
