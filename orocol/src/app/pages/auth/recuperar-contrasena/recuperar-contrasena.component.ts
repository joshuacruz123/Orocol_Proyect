import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../../shared/footer/pie.component';
import { RegresarHomeComponent } from '../../../shared/regresar-home/regresar-home.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [RouterOutlet, RouterLink, PieComponent, RegresarHomeComponent, MatIconModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css'
})
export class RecuperarContrasenaComponent {

}
