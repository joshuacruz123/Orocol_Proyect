import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formulario-minero',
  templateUrl: './formulario-minero.component.html',
  styleUrls: ['./formulario-minero.component.css']
})
export class FormularioMineroComponent {
  /*
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private servicioService: ServicioService) {
    this.userForm = this.formBuilder.group({
      nombreUsuario: [''],
      apellidosUsuario: [''],
      correoUsuario: [''],
      passwordUsuario: [''],
      estadoUsuario: ['activo'],
    });
  }

  onSubmit() {
    const newUser: Usuario = this.userForm.value;
    this.servicioService.create(newUser).subscribe(
      (response: any) => {
        console.log('Usuario creado con éxito:', response);
        // Puedes redirigir a una página de éxito, recargar datos, etc.
      },
      (error: any) => {
        console.error('Error al crear el usuario:', error);
        // Puedes manejar el error de alguna manera, mostrar un mensaje al usuario, etc.
      }
    );
  }
  */
}
