import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../pie/pie.component';
import { ProductosComponent } from '../productos/productos.component';
import { TokenService } from '../../services/token.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PieComponent, ProductosComponent, RouterLink, MatIconModule],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent implements OnInit{

  idUsuario!: number | undefined;
  nombreUsuario: string ='';
  apellidosUsuario: string ='';
  correoUsuario: string ='';
  estadoUsuario: string ='';
  roles: string ='';
  idAdmin!: number | undefined;
  cargoAdmin: string ='';


  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.tokenService.getUser();
      if (user) {
        this.idUsuario = user.idUsuario;
        this.nombreUsuario = user.nombreUsuario || '';
        this.apellidosUsuario = user.apellidosUsuario || '';
        this.correoUsuario = user.correoUsuario || '';
        this.estadoUsuario = user.estadoUsuario || '';
        this.roles = user.roles || '';
        this.idAdmin = user.idAdmin;
        this.cargoAdmin = user.cargoAdmin || '';
      }
    //this.isLogged = this.tokenService.isLogged();
  }

  cerrar(): void {
    this.tokenService.logOut();
    this.router.navigate(['/iniciar_sesion'])
  }
}
