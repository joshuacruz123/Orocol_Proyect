import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manual-usuario',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './manual-usuario.component.html',
  styleUrl: './manual-usuario.component.css'
})
export class ManualUsuarioComponent {

}
