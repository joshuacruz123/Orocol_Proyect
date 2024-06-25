import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NovedadInterface } from '../../../core/interfaces/novedad.interface';
import { TurnoService } from '../../../core/services/turno.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-editar-novedad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatIconModule],
  templateUrl: './editar-novedad.component.html',
  styleUrl: './editar-novedad.component.css'
})
export class EditarNovedadComponent implements OnInit {

  idNovedad!: number;
  novedad: NovedadInterface = {
    idNovedad: 0,
    fechaNovedad: new Date(),
    descripcion: '',
  };
  novedadForm!: FormGroup;

  constructor(
    private turnoService: TurnoService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditarNovedadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idNovedad: number }
  ) {
    this.idNovedad = data.idNovedad;
  }

  ngOnInit(): void {
    this.turnoService.consultarNovedad(this.idNovedad).subscribe((data: NovedadInterface) => {
      this.novedad = data;
      this.novedadForm = new FormGroup({
        descripcion: new FormControl(this.novedad.descripcion, Validators.required),
      });
    });
  }

  get f() {
    return this.novedadForm.controls;
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  editarNovedad() {
    this.turnoService.editarNovedad(this.idNovedad, this.novedadForm.value).subscribe(
      response => {
        this.toastr.success(response.message, 'OK:', {
          timeOut: 3000
        });
        this.dialogRef.close(true);
      },
      error => {
        console.error('Error:', error);
        this.toastr.error(error.error.message, 'Error:', {
          timeOut: 3000
        });
      }
    )
  }
}
