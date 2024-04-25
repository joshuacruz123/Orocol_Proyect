import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from '../../../core/services/usuario.service';
import { MineroInterface } from '../../../core/interfaces/minero.interface';

@Component({
  selector: 'app-detalle-minero',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './detalle-minero.component.html',
  styleUrl: './detalle-minero.component.css'
})
export class DetalleMineroComponent implements OnInit{

  IdMinero!: number;
  minero!: MineroInterface;
  imagenPerfilUrl: string = '/assets/images/perfil.jpg';
  
  constructor(
    public usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<DetalleMineroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { IdMinero: number }
  ) {
    this.IdMinero = data.IdMinero;
  }
  
  ngOnInit(): void {
    const id = this.IdMinero;
    if (id) {
      this.usuarioService.consultarMinero(id).subscribe(
        (data: MineroInterface) => { 
          this.minero = data;
          this.consultarPerfil(data.usuario.idUsuario);
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    } else {
      console.error('Error al obtener los detos del minero:');
    }
  } 

  consultarPerfil(idUsuario: number) {
    this.usuarioService.consultarPerfil(idUsuario).subscribe(
      (data: any) => {
        this.imagenPerfilUrl = data.fotoPerfilUrl || this.imagenPerfilUrl;
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    );
  }
  
  cancelar() {
    this.dialogRef.close(false);
  }
}
