import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  imagenes: string[] = [
    '../../../assets/img/barraOro.jpg',
    '../../../assets/img/extraccion.jpg',
    '../../../assets/img/flechaOro.jpg',
  ];
  
  descargarPDF(): void {
    const url = `../../../assets/Manual_orocol.pdf`; 
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = 'Manual_orocol.pdf'; 

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }
}