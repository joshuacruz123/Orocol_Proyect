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
}