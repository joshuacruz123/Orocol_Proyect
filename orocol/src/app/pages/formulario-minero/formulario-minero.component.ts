import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MineroInterface } from '../../interfaces/minero.interface';

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
      apellidosUsuario: ['', Validators.required],
      correoUsuario: ['', [Validators.required, Validators.email]],
      passwordUsuario: ['', Validators.required]
    });
  }
  
  registrarUsuario() {
    if (this.registroForm.valid) {
      this.usuarioService.registrarMinero(this.registroForm.value)
        .subscribe(
          response => {
            console.log('Usuario registrado con éxito', response);
            // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
          },
          error => {
            console.error('Error al registrar usuario', error);
            // Aquí puedes mostrar un mensaje de error al usuario
          }
        );
    }
  }
}
