import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MineroInterface } from '../../../../core/interfaces/minero.interface';

@Component({
  selector: 'app-formulario-minero',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './formulario-minero.component.html',
  styleUrl: './formulario-minero.component.css'
})
export class FormularioMineroComponent implements OnInit {
  registroForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      tipo_documento: ['', Validators.required],
      numero_documento: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      direccion_vivienda: ['', Validators.required],
      cambio_documento: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      apellidosUsuario: [''],
      correoUsuario: ['', [Validators.required, Validators.email]],
      passwordUsuario: ['', Validators.required]
    });
  }
  
  registrarUsuario() {
    if (this.registroForm.valid) {
      this.usuarioService.registrarMinero(this.registroForm.value)
        .subscribe(
          response => {
            this.router.navigate(['/iniciar_sesion']);
            this.toastr.success('Usuario creado', 'OK', {
              timeOut: 3000
            });
          },
          error => {
            console.error('Error al registrar usuario', error);
            // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
          }
        );
    }
  }
}
