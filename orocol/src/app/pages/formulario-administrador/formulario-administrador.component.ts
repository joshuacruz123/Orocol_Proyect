import { Component, /*inject*/ } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-formulario-administrador',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './formulario-administrador.component.html',
  styleUrl: './formulario-administrador.component.css'
})
export class FormularioAdministradorComponent {
  constructor(private toaster: ToastrService) {}
  //toaster= inject(ToastrService);

  mensaje() {
    this.toaster.success("se ha registrado exitosamente en el sistema.", "Registro exitoso:");
  }
}
