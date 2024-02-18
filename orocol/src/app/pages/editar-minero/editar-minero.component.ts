import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-editar-minero',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './editar-minero.component.html',
  styleUrl: './editar-minero.component.css'
})
export class EditarMineroComponent {

}
