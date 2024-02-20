import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PieComponent } from '../pie/pie.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PieComponent, NgOptimizedImage], // ngSrc
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  @ViewChild('navegacion') navegacion!: ElementRef;

  constructor() {}

  abrirMenu() {
    this.navegacion.nativeElement.classList.add('visible');
  }

  cerrarMenu() {
    this.navegacion.nativeElement.classList.remove('visible');
  }

  titulo = 'Orocol';

  imagenes: string[] = [
    'assets/images/images/barraOro.jpg',
    'assets/images/images/extraccion.jpg',
    'assets/images/images/flechaOro.jpg',
  ];
  
  descargarPDF(): void {
    const url = `assets/images/Manual_orocol.pdf`; 
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = 'Manual_orocol.pdf'; 

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }

  
}
