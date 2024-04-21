import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AdministradorInterface } from '../interfaces/administrador.interface';
import { MineroInterface } from '../interfaces/minero.interface';

@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {

  constructor(private http: HttpClient) { }

  adminURL = environment.adminURL;
  mineroURL = environment.mineroURL;

  consultarAdministradores(): Observable<AdministradorInterface[]> {
    return this.http.get<AdministradorInterface[]>(this.adminURL)
  }

  consultarAdministrador(idAdmin: number): Observable<AdministradorInterface> {
    return this.http.get<AdministradorInterface>(`${this.adminURL}${idAdmin}`)
  }

  editarAdministrador(idAdmin: number, Administrador: AdministradorInterface): Observable<any> {
    return this.http.put<void>(`${this.adminURL}${idAdmin}`, Administrador);
  }

  activarUsuario(id: number, estadoUsuario: string): Observable<any> {
    const body = { estadoUsuario: estadoUsuario };
    return this.http.put(`${this.adminURL}activar/${id}`, body)
  }

  consultarMineros(): Observable<MineroInterface[]> {
    return this.http.get<MineroInterface[]>(this.mineroURL)
  }

  consultarMinero(IdMinero: number): Observable<MineroInterface> {
    return this.http.get<MineroInterface>(`${this.mineroURL}${IdMinero}`)
  }

  editarMinero(IdMinero: number, Minero: MineroInterface): Observable<any> {
    return this.http.put<void>(`${this.mineroURL}${IdMinero}`, Minero);
  }
}
