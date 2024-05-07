import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { TurnoService } from '../../../core/services/turno.service';

@Component({
  selector: 'app-registrar-asistencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './registrar-asistencia.component.html',
  styleUrl: './registrar-asistencia.component.css'
})
export class RegistrarAsistenciaComponent {

  asisteciaForm!: FormGroup;

  constructor(
    private turnoService: TurnoService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<RegistrarAsistenciaComponent>,
    private fb: FormBuilder
  ) {
    this.asisteciaForm = this.fb.group({
      numero_documento: [null, Validators.required],
      FechaTurno: [null, Validators.required],
      Asistencia: [null, Validators.required],
      AsignacionTareas: [null, Validators.required],
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  crearAsistencia() {
    const { numero_documento } = this.asisteciaForm.value;
    this.turnoService.registrarTurno(numero_documento, this.asisteciaForm.value).subscribe(
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
