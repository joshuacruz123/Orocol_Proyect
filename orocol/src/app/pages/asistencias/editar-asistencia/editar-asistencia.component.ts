import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TurnoInterface } from '../../../core/interfaces/turno.interface';
import { TurnoService } from '../../../core/services/turno.service';

@Component({
  selector: 'app-editar-asistencia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './editar-asistencia.component.html',
  styleUrl: './editar-asistencia.component.css'
})
export class EditarAsistenciaComponent implements OnInit {

  idTurno!: number;
  turno: TurnoInterface = {
    idTurno: 0,
    FechaTurno: new Date(),
    Asistencia: '',
    AsignacionTareas: '',
    minero: { IdMinero: 0, tipo_documento: '', numero_documento: 0, telefono: 0, fecha_nacimiento: new Date(), direccion_vivienda: '', cambio_documento: '', 
      usuario: {idUsuario: 0, nombreUsuario: '', apellidosUsuario: '', correoUsuario: '', passwordUsuario: '', estadoUsuario: ''}
    },
    novedad: {idNovedad: 0, fechaNovedad: new Date(), descripcion: ''}
  };
  turnoForm!: FormGroup;
  cambioDocumentoControl: FormControl = new FormControl(false);

  constructor(
    public turnoService: TurnoService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditarAsistenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idTurno: number }
  ) {
    this.idTurno = data.idTurno;
  }

  ngOnInit(): void {
    this.turnoService.consultarTurno(this.idTurno).subscribe((data: TurnoInterface) => {
      this.turno = data;
      this.turnoForm = new FormGroup({
        FechaTurno: new FormControl(this.turno.FechaTurno, [Validators.required]),
        Asistencia: new FormControl(this.turno.Asistencia, Validators.required),
        AsignacionTareas: new FormControl(this.turno.AsignacionTareas, Validators.required),
      });
    });
  }

  get f() {
    return this.turnoForm.controls;
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  editarTurno() {
    this.turnoService.editarTurno(this.idTurno, this.turnoForm.value).subscribe(
      response => {
        this.toastr.success(response.message, 'OK', {
          timeOut: 3000
        });
        this.dialogRef.close(true);
      },
      error => {
        console.error('Error al editar la asisatencia', error);
        this.toastr.error(error.error.message, 'Error:', {
          timeOut: 3000
        });
      }
    )
  }
}
