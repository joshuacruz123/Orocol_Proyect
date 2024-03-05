import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUsuarioDto } from '../models/login-usuarios.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  usuarioURL = environment.usuarioURL

  login(correoUsuario: string, passwordUsuario: string): Observable<any> {
    const body = {
      correoUsuario: correoUsuario,
      passwordUsuario: passwordUsuario
    };
    return this.http.post<any>(`${this.usuarioURL}login`, body);
  }

  refreshToken(token: any): Observable<any> {
    return this.http.post(`${this.usuarioURL}refresh`, token);
  }
}
 