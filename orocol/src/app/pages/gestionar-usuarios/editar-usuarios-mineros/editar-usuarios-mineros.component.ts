import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MineroInterface } from '../../../core/interfaces/minero.interface';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-editar-usuarios-mineros',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './editar-usuarios-mineros.component.html',
  styleUrl: './editar-usuarios-mineros.component.css'
})
export class EditarUsuariosMinerosComponent implements OnInit {

  IdMinero!: number;
  mineros: MineroInterface = {
    IdMinero: 0,
    tipo_documento: '',
    numero_documento: 0,
    telefono: '',
    fecha_nacimiento: new Date(),
    direccion_vivienda: '',
    cambio_documento: '',
    usuario: { idUsuario: 0, nombreUsuario: '', apellidosUsuario: '', correoUsuario: '', passwordUsuario: '' }
  };
  mineroForm!: FormGroup;
  cambioDocumentoControl: FormControl = new FormControl(false);

  constructor(
    public usuarioService: UsuarioService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditarUsuariosMinerosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { IdMinero: number }
  ) {
    this.IdMinero = data.IdMinero;
  }

  ngOnInit(): void {
    this.usuarioService.consultarMinero(this.IdMinero).subscribe((data: MineroInterface) => {
      this.mineros = data;
      this.mineroForm = new FormGroup({
        nombreUsuario: new FormControl(this.mineros.usuario.nombreUsuario, Validators.required),
        apellidosUsuario: new FormControl(this.mineros.usuario.apellidosUsuario),
        correoUsuario: new FormControl(this.mineros.usuario.correoUsuario, Validators.required),
        tipo_documento: new FormControl(this.mineros.tipo_documento, Validators.required),
        numero_documento: new FormControl(this.mineros.numero_documento, Validators.required),
        telefono: new FormControl(this.mineros.telefono, Validators.required),
        fecha_nacimiento: new FormControl(this.mineros.fecha_nacimiento, [Validators.required]),
        direccion_vivienda: new FormControl(this.mineros.direccion_vivienda, Validators.required),
        cambio_documento: new FormControl(this.mineros.cambio_documento, Validators.required),
      });
    });
  }

  get f() {
    return this.mineroForm.controls;
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  editarMineros() {
    console.log(this.mineroForm.value);
    this.usuarioService.editarMinero(this.IdMinero, this.mineroForm.value).subscribe(
      response => {
        this.toastr.success(response.message, 'OK', {
          timeOut: 3000
        });
        this.dialogRef.close(true);
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