import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-info-orocol',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './info-orocol.component.html',
  styleUrl: './info-orocol.component.css'
})
export class InfoOrocolComponent {

}
