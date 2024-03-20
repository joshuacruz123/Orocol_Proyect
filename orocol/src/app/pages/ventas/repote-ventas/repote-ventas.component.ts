import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-repote-ventas',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './repote-ventas.component.html',
  styleUrl: './repote-ventas.component.css'
})
export class RepoteVentasComponent {

}
