import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { TurnoInterface } from '../interfaces/turno.interface';
import { NovedadInterface } from '../interfaces/novedad.interface';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private http: HttpClient) { }
  
  turnoURL = environment.turnoURL;
  novedadURL = environment.novedadURL;
  
  registrarTurno(numero_documento: number, turnoData: any): Observable<any> {
    return this.http.post(`${this.turnoURL}${numero_documento}/registrar`, turnoData);
  }

  consultarTurnos(): Observable<TurnoInterface[]> {
    return this.http.get<TurnoInterface[]>(this.turnoURL);
  }
  
  consultarTurnosMinero(IdMinero: number): Observable<any> {
    return this.http.get(`${this.turnoURL}${IdMinero}`);
  }

  consultarTurno(idTurno:number): Observable<any> {
    return this.http.get(`${this.turnoURL}${idTurno}/consultar`);
  }

  editarTurno(idTurno: number, turno: TurnoInterface): Observable<any> {
    return this.http.put<void>(`${this.turnoURL}${idTurno}`, turno);
  }
  
  registrarNovedades(idTurno: number, novedadData: any): Observable<any> {
    return this.http.post(`${this.novedadURL}${idTurno}`, novedadData);
  }

  consultarNovedad(idNovedad: number): Observable<NovedadInterface> {
    return this.http.get<NovedadInterface>(`${this.novedadURL}${idNovedad}`)
  }

  editarNovedad(idNovedad: number, novedad: NovedadInterface): Observable<any> {
    return this.http.put<void>(`${this.novedadURL}${idNovedad}`, novedad);
  }
}
