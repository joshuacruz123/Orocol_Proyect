import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registrar-mineros',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatIconModule],
  templateUrl: './registrar-mineros.component.html',
  styleUrl: './registrar-mineros.component.css'
})
export class RegistrarMinerosComponent {
  mineroForm!: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<RegistrarMinerosComponent>,
    private fb: FormBuilder
  ) {
    this.mineroForm = this.fb.group({
      tipo_documento: ['', Validators.required],
      numero_documento: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      direccion_vivienda: ['', Validators.required],
      cambio_documento: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      apellidosUsuario: [''],
      correoUsuario: ['', [Validators.required, Validators.email]],
      passwordUsuario: ['', Validators.required]
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  registrarMineros() {
    this.usuarioService.registrarMinero(this.mineroForm.value).subscribe(
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

  verPassword(): void {
    const x = document.getElementById("passwordUsuario") as HTMLInputElement;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
}
