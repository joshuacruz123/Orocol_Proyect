import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuarios.model'; // Asegúrate de importar tu modelo adecuado

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  create(newUser: Usuario) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/usuarios'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  createUser(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }
}
