import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
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

  consultarPerfil (idUsuario:number): Observable<any> {
    return this.http.get(`${this.usuarioURL}${idUsuario}/perfil`)
  }

  subirFotoPerfil(idUsuario:number, fotoPerfil: File) {
    const formData = new FormData();
    formData.append('fotoPerfil', fotoPerfil);
    return this.http.post(`${this.usuarioURL}${idUsuario}/perfil`, formData);
  } /*  http://localhost:3000/usuario/1/perfil
  Failed to load resource: the server responded with a status of 500 (Internal Server Error) :3000/usuario/1/perfil:1
  administrador.component.ts:64 Error al subir la foto de perfil: HttpErrorResponse administrador.component.ts:64 */

  registrarAdministrador (usuarioData: any) {
    return this.http.post(this.adminURL, usuarioData);
  }

  consultarAdministrador(idAdmin:number): Observable<any> {
    return this.http.get(this.adminURL + idAdmin)
  }

  registrarMinero(usuarioData: any) {
    return this.http.post(this.mineroURL, usuarioData);
  }

  consultarMinero(IdMinero:number): Observable<any> {
    return this.http.get(this.mineroURL + IdMinero)
  }
}
