import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../../shared/footer/pie.component';
import { RegresarHomeComponent } from '../../../shared/regresar-home/regresar-home.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../core/services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink, PieComponent, RegresarHomeComponent, MatIconModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css'
})
export class RecuperarContrasenaComponent {

  correoForm!: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.correoForm = this.fb.group({
      correoUsuario: [null, Validators.required],
    });
  }

  consultarCorreo() {
    const { correoUsuario } = this.correoForm.value;
    this.usuarioService.consultarCorreo(correoUsuario).subscribe(
      response => {
        this.router.navigate(['/editar_contrasena', { correo: correoUsuario }]);
        console.log(response.message);
      },
      error => {
        console.error('Error al consultar', error);
        this.toastr.error(error.error.message, 'Error al consultar:', {
          timeOut: 6000
        });
      }
    )
  }
}
