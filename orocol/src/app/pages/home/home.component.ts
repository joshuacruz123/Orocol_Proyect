import { CommonModule } from '@angular/common';
import { Component, /*ElementRef, ViewChild*/ } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PieComponent } from '../../shared/footer/pie.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InfoOrocolComponent } from '../../shared/info-orocol/info-orocol.component';
import { CrearSolicitudComponent } from '../solicitud-entrada/crear-solicitud/crear-solicitud.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PieComponent, RouterLink, MatIconModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor(private toastr: ToastrService, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(InfoOrocolComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

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

  agregarSolicitud() {
    const dialogRef = this.dialog.open(CrearSolicitudComponent, {
      width: '550px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
