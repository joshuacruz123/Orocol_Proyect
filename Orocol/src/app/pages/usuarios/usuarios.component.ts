import { AfterViewInit, Component, OnInit} from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2'; 
/*
npm i ngx-toastr
npm i sweetalert2 
npm install @angular/animations
@angular/core
@angular/animations
*/

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];

  listaVacia = undefined;

  constructor(
    private usuarioService: UsuarioService
    ) { } 

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.consultarUsuarios().subscribe(
      data => {
        this.usuarios = data;
        this.listaVacia = undefined;
      },
      err => {
        this.listaVacia = err.error.message;
      }
    );
  }

  
  borrar(idUsuario: number): void { console.log(`Borrar el ${idUsuario}`);
    Swal.fire({
      title: '¿Estás seguro de inactivar usuario?',
      text: 'No hay vuelta atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sip',
      cancelButtonText: 'Nops'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.inactivarUsuario(idUsuario).subscribe(res => this.cargarUsuarios());
        Swal.fire(
          'OK',
          'Usuario eliminado',
          'success'
        );
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Usuario a salvo',
          'error'
        );
      }
    }); 
  } 
}
