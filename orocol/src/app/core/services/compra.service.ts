import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { ComprasInterface } from '../interfaces/compra.interface';
import { ReporteComprasInterface } from '../interfaces/reporte-compra.interface';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private http: HttpClient) { }

  compraURL = environment.compraURL;
  
  consultarCompras(): Observable<ComprasInterface[]> {
    return this.http.get<ComprasInterface[]>(this.compraURL)
  }

  consultarCompra(IdCliente: number): Observable<ComprasInterface> {
    return this.http.get<ComprasInterface>(`${this.compraURL}${IdCliente}`)
  }

  registrarCompra(idGestionVenta: number, idAdmin: number, compra: ComprasInterface): Observable<any> {
    return this.http.post<void>(`${this.compraURL}${idGestionVenta}/${idAdmin}`, compra);
  }

  editarCompra(IdCliente: number, compra: ComprasInterface): Observable<any> {
    return this.http.put<void>(`${this.compraURL}${IdCliente}`, compra);
  }

  terminarCompra(IdCliente: number, estadoCompra: string): Observable<any> {
    const body = { estadoCompra: estadoCompra };
    return this.http.put(`${this.compraURL}compra/${IdCliente}`, body)
  }

  generarReporteCompra(): Observable<ReporteComprasInterface[]> {
    return this.http.get<ReporteComprasInterface[]>(this.compraURL).pipe(
      map(reportes => {
        reportes.forEach(reporte => {
          reporte.pdf = new jsPDF();
        });
        return reportes;
      })
    );
  }

  obtenerIndicadoresFinancieros(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/indicadores');
  }
}
