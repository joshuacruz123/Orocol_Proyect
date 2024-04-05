import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Ventas } from '../models/ventas';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VentasInterface } from '../interfaces/venta.interface';
import { ReporteVentasInterface } from '../interfaces/reporte-venta.interface';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }

  ventaURL = environment.ventaURL;
  reportesURL = environment.reportesURL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  consultarVentas(): Observable<VentasInterface[]> {
    return this.http.get<VentasInterface[]>(this.ventaURL)
  }

  consultarVenta(idGestionVenta: number): Observable<VentasInterface> {
    return this.http.get<VentasInterface>(`${this.ventaURL}${idGestionVenta}`)
  }// :idGestionVenta

  registrarVenta(venta: VentasInterface, IdMinero: number, tipoOro: string): Observable<void> {
    return this.http.post<void>(`${this.ventaURL}${IdMinero}/${tipoOro}`, venta);
  }

  registrarVentaAdmin(venta: VentasInterface, numero_documento: number, tipoOro: string): Observable<void> {
    return this.http.post<void>(`${this.ventaURL}${numero_documento}/${tipoOro}`, venta);
  }

  editarVenta(id: number, venta: VentasInterface): Observable<void> {
    return this.http.put<void>(`${this.ventaURL}entrada_venta/${id}`, venta);
  }// entrada_venta/:idGestionVenta

  inactivarVenta(id: number, estadoVenta: string): Observable<any> {
    const body = { estadoVenta: estadoVenta };
    return this.http.put(`${this.ventaURL}inactivar/${id}`, body, this.httpOptions)
  } // inactivar/:idGestionVenta

  activarVenta(id: number, estadoVenta: string): Observable<any> {
    const body = { estadoVenta: estadoVenta };
    return this.http.put(`${this.ventaURL}activar/${id}`, body, this.httpOptions)
  }// activar/:idGestionVenta

  generarReporteVenta(): Observable<ReporteVentasInterface[]> {
    return this.http.get<ReporteVentasInterface[]>(this.reportesURL)
  }
}
