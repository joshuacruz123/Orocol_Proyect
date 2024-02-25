import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-minero',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './formulario-minero.component.html',
  styleUrl: './formulario-minero.component.css'
})
export class FormularioMineroComponent {
  constructor(private toaster: ToastrService) {}
  //toaster= inject(ToastrService);

  mensaje() {
    this.toaster.success("se ha registrado exitosamente en el sistema.", "Registro exitoso:");
  }
}
