import { Component, /*inject*/ } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../services/usuario.service';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-administrador',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule, RouterOutlet],
  templateUrl: './formulario-administrador.component.html',
  styleUrl: './formulario-administrador.component.css'
})
export class FormularioAdministradorComponent {

  cargoAdmin: string ='';
  nombreUsuario: string ='';
  apellidosUsuario: string ='';
  correoUsuario: string = '';
  passwordUsuario: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router,
  ) {}
  
  registrarUsuario() {
    this.usuarioService.registrarAdministrador(this.cargoAdmin, this.nombreUsuario, this.apellidosUsuario, this.correoUsuario, this.passwordUsuario).subscribe(
      (response) => {
        this.toastr.success('Usuario creado', 'OK', {
          timeOut: 3000
        });
        this.router.navigate(['/iniciar_sesion']);
      },
      (error) => {
        console.error('Error:', error);
      } 
    );
  }
}
