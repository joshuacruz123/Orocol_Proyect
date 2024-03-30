import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../shared/footer/pie.component';
import { EncabezadoComponent } from '../../shared/encabezado/encabezado.component';
import { NavMineroComponent } from '../../shared/navbar-usuarios/nav-minero.component';
import { MatIconModule } from '@angular/material/icon';

import { TokenService } from '../../core/services/token.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { PerfilUsuarioComponent } from '../../shared/perfil-usuario/perfil-usuario.component';
import { MineroInterface } from '../../core/interfaces/minero.interface';

@Component({
  selector: 'app-minero',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, EncabezadoComponent, NavMineroComponent, PerfilUsuarioComponent, PieComponent, MatIconModule],
  templateUrl: './minero.component.html',
  styleUrl: './minero.component.css'
})
export class MineroComponent implements OnInit{

  minero!: MineroInterface;

  constructor(
    public usuarioService: UsuarioService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = this.tokenService.getUser();
    if (user && user.IdMinero) {
      const IdMinero = user.IdMinero;
      this.usuarioService.consultarMinero(IdMinero).subscribe(
        (data: MineroInterface) => {
          this.minero = data;
        },
        (error) => {
          console.error('Error al obtener los datos del minero:', error);
        }
      );
    } else {
      console.error('El usuario actual no es un minero.');
    }
  }
}
