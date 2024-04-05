import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../../shared/footer/pie.component';
import { MatIconModule } from '@angular/material/icon';
import { RegresarHomeComponent } from '../../../shared/regresar-home/regresar-home.component';

@Component({
  selector: 'app-editar-contrasena',
  standalone: true,
  imports: [RouterOutlet, RouterLink, PieComponent, RegresarHomeComponent, MatIconModule],
  templateUrl: './editar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css'
})
export class EditarContrasenaComponent {

  verPassword(): void {
    const x = document.getElementById("passwordUsuario" || "editarPasswordUsuario") as HTMLInputElement;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
}
