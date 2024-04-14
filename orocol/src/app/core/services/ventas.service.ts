import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, map, of, switchMap, throwError } from 'rxjs';
import { VentasInterface } from '../interfaces/venta.interface';
import { ReporteVentasInterface } from '../interfaces/reporte-venta.interface';
import jsPDF from 'jspdf';

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

  registrarVenta(IdMinero: number, TipoOro: string, venta: VentasInterface): Observable<any> {
    return this.http.post<void>(`${this.ventaURL}${IdMinero}/${TipoOro}`, venta);
  }

  registrarVentaAdmin(numero_documento: number, TipoOro: string, venta: any): Observable<any> {
    return this.http.post<void>(`${this.ventaURL}${numero_documento}/admin/${TipoOro}`, venta);
  } // 1012587523 Oro de 24 quilates 

  editarVenta(idGestionVenta: number, venta: VentasInterface): Observable<any> {
    return this.http.put<void>(`${this.ventaURL}${idGestionVenta}`, venta);
  }// entrada_venta/:idGestionVenta

  inactivarVenta(idGestionVenta: number, estadoVenta: string): Observable<any> {
    const body = { estadoVenta: estadoVenta };
    return this.http.put(`${this.ventaURL}inactivar/${idGestionVenta}`, body, this.httpOptions)
  } // inactivar/:idGestionVenta

  activarVenta(id: number, estadoVenta: string): Observable<any> {
    const body = { estadoVenta: estadoVenta };
    return this.http.put(`${this.ventaURL}activar/${id}`, body, this.httpOptions)
  }// activar/:idGestionVenta

  generarReporteVenta(): Observable<ReporteVentasInterface[]> {
    return this.http.get<ReporteVentasInterface[]>(this.reportesURL).pipe(
      map(reportes => {
        reportes.forEach(reporte => {
          reporte.pdf = new jsPDF();
        });
        return reportes;
      })
    );
  }
}
