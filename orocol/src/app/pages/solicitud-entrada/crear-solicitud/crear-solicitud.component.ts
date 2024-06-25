import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../core/services/usuario.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-crear-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatIcon],
  templateUrl: './crear-solicitud.component.html',
  styleUrl: './crear-solicitud.component.css'
})
export class CrearSolicitudComponent {
 
  form!: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<CrearSolicitudComponent>,
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      correoUsuario: new FormControl('', [Validators.required]),
      descripcionSolicitud: new FormControl('', [Validators.required])
    });
  }

  get f(){
    return this.form.controls;
  }

  crearProducto(){
    const {correoUsuario} = this.form.value;
    this.usuarioService.crearSolicitudIngreso(correoUsuario, this.form.value).subscribe(
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
