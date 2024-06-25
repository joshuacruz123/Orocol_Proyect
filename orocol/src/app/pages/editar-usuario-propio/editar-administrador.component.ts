import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';
import { AdministradorInterface } from '../../core/interfaces/administrador.interface';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { EncabezadoComponent } from '../../shared/encabezado/encabezado.component';
import { PieComponent } from '../../shared/footer/pie.component';

@Component({
  selector: 'app-editar-administrador',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule, MatIconModule, EncabezadoComponent, PieComponent],
  templateUrl: './editar-administrador.component.html',
  styleUrl: './editar-usuario-propio.component.css'
})
export class EditarAdministradorComponent {

  id!: number;
  administrador: AdministradorInterface = {
    idAdmin: 0,
    cargoAdmin: '',
    usuario: { idUsuario: 0, nombreUsuario: '', apellidosUsuario: '', correoUsuario: '', passwordUsuario: '' }
  };
  adminForm!: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idAdmin'];
    this.usuarioService.consultarAdministrador(this.id).subscribe((data: AdministradorInterface) => {
      this.administrador = data;
      this.adminForm = new FormGroup({
        nombreUsuario: new FormControl(this.administrador.usuario.nombreUsuario, Validators.required),
        apellidosUsuario: new FormControl(this.administrador.usuario.apellidosUsuario),
        correoUsuario: new FormControl(this.administrador.usuario.correoUsuario, Validators.required),
        cargoAdmin: new FormControl(this.administrador.cargoAdmin, Validators.required),
      });
    });
  }

  get f() {
    return this.adminForm.controls;
  }

  editarAdmin() {
    this.usuarioService.editarAdministrador(this.id, this.adminForm.value).subscribe(
      response => {
        this.router.navigate(['/administrador']);
        this.toastr.success(response.message, 'OK', {
          timeOut: 3000
        });
      },
      error => {
        console.error('Error al editar tus datos', error);
        this.toastr.error(error.error.message, 'Error al editar tus datos:', {
          timeOut: 3000
        });
      }
    )
  }
}
