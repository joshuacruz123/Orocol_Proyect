import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-info-orocol',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, RouterOutlet, RouterLink],
  templateUrl: './info-orocol.component.html',
  styleUrl: './info-orocol.component.css'
})
export class InfoOrocolComponent {

}
