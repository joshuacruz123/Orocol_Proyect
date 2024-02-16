import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  template: `
    <div class="container">
      <div style="width: 70%; margin: auto;">
        <carousel>
          <slide *ngFor="let imagen of imagenes">
            <img [src]="imagen" alt="Imagen">
          </slide>
        </carousel>
      </div>
    </div>
  `,
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  imagenes: string[] = [
    '../../../assets/img/barraOro.jpg',
    '../../../assets/img/extraccion.jpg',
    '../../../assets/img/flechaOro.jpg',
  ];
}
