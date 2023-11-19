import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manual-usuario',
  templateUrl: './manual-usuario.component.html',
  styleUrls: ['./manual-usuario.component.css']
})
export class ManualUsuarioComponent implements OnInit {
  pdfSrc: string = 'assets/Manual_orocol.pdf'; 

  constructor() { }

  ngOnInit(): void {
  }
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
