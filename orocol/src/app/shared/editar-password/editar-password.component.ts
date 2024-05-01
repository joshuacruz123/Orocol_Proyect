import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../core/services/usuario.service';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-editar-password',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './editar-password.component.html',
  styleUrl: './editar-password.component.css'
})
export class EditarPasswordComponent implements OnInit {
  editarForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    this.editarForm = this.formBuilder.group({
      passwordAnterior: ['', Validators.required],
      passwordNuevo: ['', Validators.required]
    });
  }

  editarContrasenna() {
    if (this.editarForm.valid) {
      let confirmar;
      do {
        confirmar = confirm("¿Deseas editar tu contraseña?");
        if (confirmar) {
          const user = this.tokenService.getUser();
          if (user && user.idUsuario) {
            const idUsuario = user.idUsuario;
            this.usuarioService.editarPassword(idUsuario, this.editarForm.value)
              .subscribe(
                response => {
                  this.toastr.success(response.message, 'OK', {
                    timeOut: 6000
                  });
                },
                error => {
                  this.toastr.error(error.error.message, 'Error:', {
                    timeOut: 6000
                  });
                }
              );
          } else {
            console.error('No exise el usuario.');
          }
        } else {
          break;
        }
      } while (!confirmar);
    }
  }

  verPassword(): void {
    const y = document.getElementById("passwordNuevo") as HTMLInputElement;
    if (y.type === "password") {
      y.type = "text";
    } else {
      y.type = "password";
    }
  }
}
