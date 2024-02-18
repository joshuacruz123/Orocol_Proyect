import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-editar-administrador',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './editar-administrador.component.html',
  styleUrl: './editar-administrador.component.css'
})
export class EditarAdministradorComponent {

}
