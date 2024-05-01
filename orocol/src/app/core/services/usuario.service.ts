import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MineroInterface } from '../interfaces/minero.interface';
import { AdministradorInterface } from '../interfaces/administrador.interface';
import { PasswordInterface } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  usuarioURL = environment.usuarioURL;
  adminURL = environment.adminURL;
  mineroURL = environment.mineroURL;
  paswordURL = environment.paswordURL;

  login(correoUsuario: string, passwordUsuario: string): Observable<any> {
    const body = {
      correoUsuario: correoUsuario,
      passwordUsuario: passwordUsuario
    };
    return this.http.post<any>(`${this.usuarioURL}login`, body);
  }

  consultarCorreo(correo: string): Observable<any> {
    return this.http.get<void>(this.paswordURL + correo); // mejor cambiar
  }

  recuperarPassword(correo: string, pass: PasswordInterface): Observable<any> {
    return this.http.put<void>(`${this.paswordURL}recuperarPass/${correo}`, pass);
  }

  refreshToken(token: any): Observable<any> {
    return this.http.post(`${this.usuarioURL}refresh`, token);
  }

  consultarPerfil (idUsuario:number): Observable<any> {
    return this.http.get(`${this.usuarioURL}${idUsuario}/perfil`);
  }

  subirFotoPerfil(idUsuario:number, fotoPerfil: File) {
    const formData = new FormData();
    formData.append('fotoPerfil', fotoPerfil);
    return this.http.post(`${this.usuarioURL}${idUsuario}/perfil`, formData);
  }

  editarPassword(id: number, pass: any): Observable<any> {
    return this.http.put<void>(`${this.usuarioURL}password/${id}`, pass);
  } /*
  registrarVenta(IdMinero: number, TipoOro: string, venta: VentasInterface): Observable<any> {
    return this.http.post<void>(`${this.ventaURL}${IdMinero}/${TipoOro}`, venta);
  } */

  registrarAdministrador (usuarioData: any) {
    return this.http.post(this.adminURL, usuarioData);
  }

  consultarAdministrador(idAdmin:number): Observable<any> {
    return this.http.get(this.adminURL + idAdmin)
  }

  editarAdministrador(id: number, admin: AdministradorInterface): Observable<any> {
    return this.http.put<void>(`${this.adminURL}${id}`, admin);
  }

  registrarMinero(usuarioData: any): Observable<any> {
    return this.http.post(this.mineroURL, usuarioData);
  }

  consultarMinero(IdMinero:number): Observable<any> {
    return this.http.get(this.mineroURL + IdMinero)
  }

  editarMinero(id: number, minero: MineroInterface): Observable<any> {
    return this.http.put<void>(`${this.mineroURL}${id}`, minero);
  }

  inactivarCuenta(id: number, estadoUsuario: string): Observable<any> {
    const body = { estadoUsuario: estadoUsuario };
    return this.http.put(`${this.usuarioURL}${id}`, body)
  }
}
