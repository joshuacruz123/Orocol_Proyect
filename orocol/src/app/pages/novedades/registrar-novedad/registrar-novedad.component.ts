import { Component, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TurnoService } from '../../../core/services/turno.service';

@Component({
  selector: 'app-registrar-novedad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './registrar-novedad.component.html',
  styleUrl: './registrar-novedad.component.css'
})
export class RegistrarNovedadComponent {
  novedadForm!: FormGroup;
  idTurno!: number;

  constructor(
    private turnoService: TurnoService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegistrarNovedadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idTurno: number }
  ) {
    this.idTurno = data.idTurno;
    this.novedadForm = this.fb.group({
      descripcion: ['', Validators.required],
    });
  }

  registrarNovedad() {
    this.turnoService.registrarNovedades(this.idTurno, this.novedadForm.value).subscribe(
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

  cancelar() {
    this.dialogRef.close(false);
  }
}
