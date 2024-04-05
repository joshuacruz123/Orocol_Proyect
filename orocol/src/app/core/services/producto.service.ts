import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Productos } from '../models/productos';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductosInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  productosURL = environment.productosURL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  consultarProductos(): Observable<ProductosInterface[]> {
    return this.http.get<ProductosInterface[]>(this.productosURL);
  }

  registrarProducto(producto: ProductosInterface): Observable<any> {
    return this.http.post(this.productosURL, JSON.stringify(producto), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  inactivarProducto(id: number, estadoProducto: string): Observable<any> {
    const body = { estadoProducto: estadoProducto };
    return this.http.put(`${this.productosURL}desactivar/${id}`, body, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  activarProducto(id: number, estadoProducto: string): Observable<any> {
    const body = { estadoProducto: estadoProducto };
    return this.http.put(`${this.productosURL}activar/${id}`, body, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }  

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
