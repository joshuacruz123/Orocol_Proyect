import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-formulario-administrador',
  templateUrl: './formulario-administrador.component.html',
  styleUrls: ['./formulario-administrador.component.css']
})
export class FormularioAdministradorComponent { 

  nombreUsuario = '';
  apellidosUsuario = '';  
  correoUsuario = ''; 
  passwordUsuario = ''; 

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const usuario = new Usuario(this.nombreUsuario, this.apellidosUsuario, this.correoUsuario, this.passwordUsuario);
    this.usuarioService.registrarUsuario(usuario).subscribe(
      data => {
        this.toastr.success(data.message, 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }
  /*
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private servicioService: ServicioService) {
    this.userForm = this.formBuilder.group({
      nombreUsuarioUsuario: [''],
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
  }*/
}
