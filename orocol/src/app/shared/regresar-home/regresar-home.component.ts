import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-regresar-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatIconModule],
  templateUrl: './regresar-home.component.html',
  styleUrl: './regresar-home.component.css'
})
export class RegresarHomeComponent {

}
