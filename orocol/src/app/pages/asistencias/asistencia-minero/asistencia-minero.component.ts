import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../../shared/encabezado/encabezado.component';
import { MatIconModule } from '@angular/material/icon';
import { NavMineroComponent } from '../../../shared/navbar-usuarios/nav-minero.component';
import { TurnoService } from '../../../core/services/turno.service';
import { TokenService } from '../../../core/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarNovedadComponent } from '../../novedades/registrar-novedad/registrar-novedad.component';
import { ConsultarNovedadComponent } from '../../novedades/consultar-novedad/consultar-novedad.component';
import { EditarNovedadComponent } from '../../novedades/editar-novedad/editar-novedad.component';

@Component({
  selector: 'app-asistencia-minero',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavMineroComponent, PieComponent, MatIconModule],
  templateUrl: './asistencia-minero.component.html',
  styleUrl: './asistencia-minero.component.css'
})
export class AsistenciaMineroComponent implements OnInit{
  turnos: any[] = [];

  constructor( 
    private turnoService: TurnoService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.conseguirTurnos();
  }

  conseguirTurnos(): void {
    const usuario = this.tokenService.getUser();
    if (usuario && usuario.IdMinero) {
      const IdMinero = usuario.IdMinero;
      this.turnoService.consultarTurnosMinero(IdMinero)
        .subscribe(turnos => {
          this.turnos = turnos.turno;
        });
    } else {
      console.error('Error al conseguir los turnos')
    }
  }

  agregarNovedad(idTurno?: number) {
    const dialogRef = this.dialog.open(RegistrarNovedadComponent, {
      width: '550px',
      disableClose: true,
      data: { idTurno: idTurno }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.conseguirTurnos();
      }
    });
  }

  verNovedad(idNovedad?: number) {
    const dialogRef = this.dialog.open(ConsultarNovedadComponent, {
      width: '550px',
      disableClose: true,
      data: { idNovedad: idNovedad }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.conseguirTurnos();
      }
    });
  }
}
