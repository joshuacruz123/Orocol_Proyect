import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, /*ElementRef, ViewChild*/ } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../pie/pie.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PieComponent, NgOptimizedImage, RouterLink], // ngSrc
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor(){}

  menuVariable: boolean = false;

  menu_icon_variable:boolean = false;

  color:boolean = false;

  abrirMenu() {
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
    this.color =! this.color;
  } // Menú responsive

  titulo = 'Orocol'; // Título

  imagenes: string[] = [
    'assets/images/images/barraOro.jpg',
    'assets/images/images/extraccion.jpg',
    'assets/images/images/flechaOro.jpg',
  ]; // Inagenes usadas carousel
  
  descargarPDF(): void {
    const url = `assets/images/Manual_orocol.pdf`; 
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = 'Manual_orocol.pdf'; 

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  } // Descargar PDF

  
}
