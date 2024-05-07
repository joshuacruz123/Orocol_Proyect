import { Component } from '@angular/core';
import { SolicitudInterface } from '../../../core/interfaces/solicitud.interface';
import { UsuarioService } from '../../../core/services/usuario.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DetalleMineroComponent } from '../../gestionar-usuarios/ver-mineros/detalle-minero.component';

@Component({
  selector: 'app-consultar-solicitudes',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './consultar-solicitudes.component.html',
  styleUrl: './consultar-solicitudes.component.css'
})
export class ConsultarSolicitudesComponent {

  solicitudList: SolicitudInterface[] = [];

  constructor(
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<DetalleMineroComponent>,
  ) { }

  ngOnInit(): void {
    this.consultarSolicitudes();
  }

  consultarSolicitudes() {
    this.usuarioService.consultarSolicitudesIngreso().subscribe({
      next: (result) => {
        this.solicitudList = result;
      },
      error: (err) => {
        console.log(err);
      }
    });
  } // Función para ver las Compras
  
  cancelar() {
    this.dialogRef.close(false);
  }
}
