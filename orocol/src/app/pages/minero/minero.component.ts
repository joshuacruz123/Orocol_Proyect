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

  nombreUsuario: string ='';
  apellidosUsuario: string ='';
  correoUsuario: string ='';
  estadoUsuario: string ='';
  roles: string ='';

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { 
    //this.isLogged = false;
  }

  ngOnInit(): void {
    const user = this.tokenService.getUser();
      if (user) {
        this.nombreUsuario = user.nombreUsuario || '';
        this.apellidosUsuario = user.apellidosUsuario || '';
        this.correoUsuario = user.correoUsuario || '';
        this.estadoUsuario = user.estadoUsuario || '';
        this.roles = user.roles || '';
      }
    //this.isLogged = this.tokenService.isLogged();
  }

  cerrar(): void {
    this.tokenService.logOut();
    this.router.navigate(['/iniciar_sesion'])
  }

}
