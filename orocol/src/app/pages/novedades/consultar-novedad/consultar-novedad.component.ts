import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TurnoService } from '../../../core/services/turno.service';
import { NovedadInterface } from '../../../core/interfaces/novedad.interface';
import { MatIconModule } from '@angular/material/icon';
import { EditarNovedadComponent } from '../editar-novedad/editar-novedad.component';
import { TokenService } from '../../../core/services/token.service';

@Component({
  selector: 'app-consultar-novedad',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './consultar-novedad.component.html',
  styleUrl: './consultar-novedad.component.css'
})
export class ConsultarNovedadComponent implements OnInit{

  idNovedad!: number;
  novedad!: NovedadInterface;
  usuarioAdmin!: boolean; 
  
  constructor(
    public turnoService: TurnoService,
    private tokenService: TokenService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConsultarNovedadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idNovedad: number }
  ) {
    this.idNovedad = data.idNovedad;
  }
  
  ngOnInit(): void {
    const id = this.idNovedad;
    if (id) { 
      this.turnoService.consultarNovedad(id).subscribe(
        (data: NovedadInterface) => { 
          this.novedad = data;
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
      this.usuarioAdmin = this.tokenService.validarPermisosUsuarios();
    } else {
      console.error('Error al obtener los detos de la novedad:');
    }
  }

  editarNovedad(idNovedad?: number) {
    this.dialogRef.close(false);
    const dialogRe = this.dialog.open(EditarNovedadComponent, {
      width: '550px',
      disableClose: true,
      data: { idNovedad: idNovedad }
    }); /*
    dialogRe.afterClosed().subscribe(result => {
      if (result) { 
        this.ngOnInit();
      }
    }); */
  }
  
  cancelar() {
    this.dialogRef.close(false);
  }
}
