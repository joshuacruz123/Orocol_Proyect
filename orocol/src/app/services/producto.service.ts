import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
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

  public consultarProducto(IdProducto: number): Observable<Productos> {
    return this.http.get<Productos>(`${this.productosURL}${IdProducto}`);
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
  /*
  public consultarProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.productosURL}`);
  } 
  
  public registrarProducto(producto: Productos): Observable<any> {
    return this.http.post<any>(`${this.productosURL}`, producto);
  }
  
  public consultarProducto(IdProducto: number): Observable<Productos> {
    return this.http.get<Productos>(`${this.productosURL}${IdProducto}`);
  }
  */

  /*public editar(IdProducto: number, producto: Productos): Observable<any> {
    return this.http.put<any>(`${this.productosURL}${IdProducto}`, producto);
  } 
  
  public desactivarProducto(IdProducto: number, producto: Productos): Observable<any> {
    return this.http.put<any>(this.productosURL + `desactivar/${IdProducto}`, producto);
  }

  public activarProducto(IdProducto: number, producto: Productos): Observable<any> {
    return this.http.put<any>(this.productosURL + `activar/${IdProducto}`, producto);
  }

Failed to load resource: the server responded with a status of 400 (Bad Request)
core.mjs:7473 ERROR Error Code: 400
Message: Http failure response for http://localhost:8080/producto/desactivar/1: 400 Bad Request
:8080/producto/activar/2:1 
            
Failed to load resource: the server responded with a status of 400 (Bad Request)
core.mjs:7473 ERROR Error Code: 400
Message: Http failure response for http://localhost:8080/producto/activar/2: 400 Bad Request

http://localhost:8080/producto/desactivar/:IdProducto
*/


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
