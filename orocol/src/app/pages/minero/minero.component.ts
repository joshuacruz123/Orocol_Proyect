import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-minero',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './minero.component.html',
  styleUrl: './minero.component.css'
})
export class MineroComponent {

}
