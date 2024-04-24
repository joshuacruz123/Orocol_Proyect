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
  perfil: any;
  fotoPerfil: File | null = null;
  imagenPerfilUrl: string = '/assets/images/perfil.jpg';
  mostrarFoto: boolean = false;
  
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
          this.consultarPerfilUsuario();
        },
        (error) => {
          console.error('Error al obtener los datos:', error);
        }
      );
    } else {
      console.error('Error al obtener los detos del minero:');
    }
  } 
  
  consultarPerfilUsuario() {
    if (this.minero && this.minero.usuario && this.minero.usuario.idUsuario) {
      this.usuarioService.consultarPerfil(this.minero.usuario.idUsuario).subscribe(
        (data: any) => {
          this.imagenPerfilUrl = data.fotoPerfil || this.imagenPerfilUrl;
          this.mostrarFoto = !!data.fotoPerfilUrl;
        },
        (error) => {
          console.error('Error al obtener el perfil del usuario:', error);
        }
      );
    } else {
      console.error('No se puede consultar el perfil del usuario: ID de usuario no disponible.');
    }
  }
  
  
  cancelar() {
    this.dialogRef.close(false);
  }
}
