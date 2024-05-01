import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { PieComponent } from '../../../shared/footer/pie.component';
import { MatIconModule } from '@angular/material/icon';
import { RegresarHomeComponent } from '../../../shared/regresar-home/regresar-home.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../core/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-contrasena',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet, RouterLink, PieComponent, RegresarHomeComponent, MatIconModule],
  templateUrl: './editar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css'
})
export class EditarContrasenaComponent implements OnInit {
  editarForm: FormGroup = new FormGroup({});
  correo!: string;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const correoParam = this.route.snapshot.paramMap.get('correo');
    this.correo = correoParam ? correoParam : '';
    this.editarForm = this.formBuilder.group({
      passwordNuevo: ['', Validators.required],
      confirmarPwd: ['', Validators.required]
    });
  }

  recuperarPass() {
    if (this.editarForm.valid) {
      const nuevaPass = this.editarForm.get('passwordNuevo')?.value;
      const confirmarPass = this.editarForm.get('confirmarPwd')?.value;
      if (nuevaPass === confirmarPass) {
        this.usuarioService.recuperarPassword(this.correo, this.editarForm.value)
          .subscribe(
            response => {
              this.router.navigate(['/iniciar_sesion']);
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
        const ad: HTMLElement | null = document.getElementById('advertencia');
        if (ad) {
          ad.innerHTML = `<div class="alert alert-danger">La contraseña debe ser la misma en los dos campos.</div>`;
        }
      }
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
