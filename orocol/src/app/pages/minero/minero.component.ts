import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../pie/pie.component';
import { MatIconModule } from '@angular/material/icon';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-minero',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PieComponent, RouterLink, MatIconModule],
  templateUrl: './minero.component.html',
  styleUrl: './minero.component.css'
})
export class MineroComponent implements OnInit{

  idUsuario!: number | undefined;
  nombreUsuario: string ='';
  apellidosUsuario: string ='';
  correoUsuario: string ='';
  estadoUsuario: string ='';
  roles: string ='';

  IdMinero!: number | undefined; 
  tipo_documento: string ='';
  numero_documento!: number | undefined;
  telefono!: number | undefined; 
  fecha_nacimiento!: Date | undefined; 
  direccion_vivienda: string ='';
  cambio_documento: string ='';

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { 
    //this.isLogged = false;
  }

  ngOnInit(): void {
    const user = this.tokenService.getUser();
      if (user) {
        this.idUsuario = user.idUsuario;
        this.nombreUsuario = user.nombreUsuario || '';
        this.apellidosUsuario = user.apellidosUsuario || '';
        this.correoUsuario = user.correoUsuario || '';
        this.estadoUsuario = user.estadoUsuario || '';
        this.roles = user.roles || '';
        this.IdMinero = user.IdMinero;
        this.tipo_documento = user.tipo_documento || '';
        this.numero_documento = user.numero_documento;
        this.telefono = user.telefono;
        this.fecha_nacimiento = user.fecha_nacimiento;
        this.direccion_vivienda = user.direccion_vivienda || '';
        this.cambio_documento = user.cambio_documento || '';
      }
    //this.isLogged = this.tokenService.isLogged();
  }

  cerrar(): void {
    this.tokenService.logOut();
    this.router.navigate(['/iniciar_sesion'])
  }

}
