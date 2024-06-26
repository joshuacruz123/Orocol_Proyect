import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { NavAdminComponent } from '../../../shared/navbar-usuarios/nav-admin.component';
import { PieComponent } from '../../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../../shared/encabezado/encabezado.component';
import { TurnoFechaInterface, TurnoInterface } from '../../../core/interfaces/turno.interface';
import { TurnoService } from '../../../core/services/turno.service';
import { MatDialog } from '@angular/material/dialog';
import { ConsultarNovedadComponent } from '../../novedades/consultar-novedad/consultar-novedad.component';
import { EditarAsistenciaComponent } from '../editar-asistencia/editar-asistencia.component';
import { RegistrarAsistenciaComponent } from '../registrar-asistencia/registrar-asistencia.component';

@Component({
  selector: 'app-asistencia-admin',
  standalone: true,
  imports: [CommonModule, EncabezadoComponent, PieComponent, NavAdminComponent, MatIconModule, RouterLink, RouterOutlet],
  templateUrl: './asistencia-admin.component.html',
  styleUrl: './asistencia-admin.component.css'
})
export class AsistenciaAdminComponent implements OnInit {

  turnosHoy: TurnoInterface[] = [];
  turnosAnteriores: TurnoInterface[] = [];
  turnosHoyFiltro: TurnoInterface[] = [];
  turnosAnterioresFiltro: TurnoInterface[] = [];

  constructor(
    private turnoService: TurnoService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.consultarTurnos();
  }

  consultarTurnos() {
    this.turnoService.consultarTurnos().subscribe({
      next: (result) => {
        this.turnosHoy = result.hoy;
        this.turnosAnteriores = result.anteriores;
        this.turnosHoyFiltro = [...this.turnosHoy]; 
        this.turnosAnterioresFiltro = [...this.turnosAnteriores];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  registrarAsistencia() {
    const dialogRef = this.dialog.open(RegistrarAsistenciaComponent, {
      width: '550px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consultarTurnos();
      }
    });
  }

  buscarAsistencias(event: any) {
    const busqueda = event?.target?.value.trim().toLowerCase() || '';
    this.turnosHoyFiltro = this.turnosHoy.filter(turno =>
      turno.minero.usuario.nombreUsuario.toLowerCase().includes(busqueda) ||
      turno.minero.usuario.apellidosUsuario.toLowerCase().includes(busqueda) ||
      turno.minero.numero_documento.toString().toLowerCase().includes(busqueda)
    );
    this.turnosAnterioresFiltro = this.turnosAnteriores.filter(turno =>
      turno.minero.usuario.nombreUsuario.toLowerCase().includes(busqueda) ||
      turno.minero.usuario.apellidosUsuario.toLowerCase().includes(busqueda) ||
      turno.minero.numero_documento.toString().toLowerCase().includes(busqueda)
    );
  }

  verNovedad(idNovedad?: number) {
    const dialogRef = this.dialog.open(ConsultarNovedadComponent, {
      width: '550px',
      disableClose: true,
      data: { idNovedad: idNovedad }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.consultarTurnos();
      }
    });
  }

  editarAsistencia(idTurno?: number) {
    const dialogRef = this.dialog.open(EditarAsistenciaComponent, {
      width: '550px',
      disableClose: true,
      data: { idTurno: idTurno }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.consultarTurnos();
      }
    });
  }
}
