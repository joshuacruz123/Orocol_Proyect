import { Injectable } from '@angular/core';
import { Usuario } from './../models/usuario';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioURL = environment.usuarioURL;

  constructor(private httpClient: HttpClient) { }

  public consultarUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.usuarioURL}`);
  }

  public consultarUsuario(idUsuario: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.usuarioURL}${idUsuario}`);
  }

  public registrarUsuario(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(`${this.usuarioURL}`, usuario);
  }

  public editarUsuario(idUsuario: number, usuario: Usuario): Observable<any> {
    return this.httpClient.put<any>(`${this.usuarioURL}${idUsuario}`, usuario);
  }

  public inactivarUsuario(idUsuario: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.usuarioURL}${idUsuario}`);
  }
}
