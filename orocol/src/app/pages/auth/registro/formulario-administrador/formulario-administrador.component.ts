import { Component, OnInit, /*inject*/ } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-administrador',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './formulario-administrador.component.html',
  styleUrl: './formulario-administrador.component.css'
})
export class FormularioAdministradorComponent implements OnInit {
  registroForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      cargoAdmin: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      apellidosUsuario: [''],
      correoUsuario: ['', [Validators.required, Validators.email]],
      passwordUsuario: ['', Validators.required]
    });
  }
  
  registrarUsuario() {
    if (this.registroForm.valid) {
      this.usuarioService.registrarAdministrador(this.registroForm.value)
        .subscribe(
          response => {
            this.router.navigate(['/iniciar_sesion']);
            this.toastr.success('Usuario creado', 'OK', {
              timeOut: 3000
            });
          },
          error => {
            console.error('Error al registrar usuario', error);
          }
        );
    }
  }

  verPassword(): void {
    const x = document.getElementById("passwordUsuario") as HTMLInputElement;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
}
