import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  usuarioURL = environment.usuarioURL;
  adminURL = environment.adminURL;
  mineroURL = environment.mineroURL;

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

  registrarAdministrador(cargoAdmin: string, nombreUsuario: string, apellidosUsuario: string, 
    correoUsuario: string, passwordUsuario: string): Observable<any> {
    const body = {
      cargoAdmin: cargoAdmin,
      nombreUsuario: nombreUsuario,
      apellidosUsuario: apellidosUsuario,
      correoUsuario: correoUsuario,
      passwordUsuario: passwordUsuario
    };
    return this.http.post(this.adminURL, body);
  }

  registrarMinero (usuarioData: any) {
    return this.http.post(this.mineroURL, usuarioData);
  }
}
