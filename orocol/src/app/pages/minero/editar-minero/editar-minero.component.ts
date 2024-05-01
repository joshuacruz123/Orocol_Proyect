import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EncabezadoComponent } from '../../../shared/encabezado/encabezado.component';
import { PieComponent } from '../../../shared/footer/pie.component';
import { UsuarioService } from '../../../core/services/usuario.service';
import { MineroInterface } from '../../../core/interfaces/minero.interface';

@Component({
  selector: 'app-editar-minero',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ReactiveFormsModule, EncabezadoComponent, PieComponent],
  templateUrl: './editar-minero.component.html',
  styleUrl: './editar-minero.component.css'
})
export class EditarMineroComponent {

  id!: number;
  mineros: MineroInterface = {
    IdMinero: 0,
    tipo_documento: '',
    numero_documento: 0,
    telefono: 0,
    fecha_nacimiento: new Date(),
    direccion_vivienda: '',
    cambio_documento: '',
    usuario: { idUsuario: 0, nombreUsuario: '', apellidosUsuario: '', correoUsuario: '', passwordUsuario: '' }
  };
  mineroForm!: FormGroup;

  constructor(
    public usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['IdMinero'];
    this.usuarioService.consultarMinero(this.id).subscribe((data: MineroInterface) => {
      this.mineros = data;
      this.mineroForm = new FormGroup({
        nombreUsuario: new FormControl(this.mineros.usuario.nombreUsuario, Validators.required),
        apellidosUsuario: new FormControl(this.mineros.usuario.apellidosUsuario),
        correoUsuario: new FormControl(this.mineros.usuario.correoUsuario, Validators.required),
        tipo_documento: new FormControl(this.mineros.tipo_documento, Validators.required),
        numero_documento: new FormControl(this.mineros.numero_documento, Validators.required),
        telefono: new FormControl(this.mineros.telefono, Validators.required),
        fecha_nacimiento: new FormControl(this.mineros.fecha_nacimiento, [Validators.required]),
        direccion_vivienda: new FormControl(this.mineros.direccion_vivienda, Validators.required),
        cambio_documento: new FormControl(this.mineros.cambio_documento, Validators.required),
      });
    });
  }

  get f() {
    return this.mineroForm.controls;
  }

  editarMinero() {
    this.usuarioService.editarMinero(this.id, this.mineroForm.value).subscribe(
      response => {
        this.router.navigate(['/minero']);
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
