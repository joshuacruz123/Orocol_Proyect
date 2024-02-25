import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Productos } from '../models/productos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  productosURL = environment.productosURL;

  public consultarProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.productosURL}`);
  }

  public consultarProducto(IdProducto: number): Observable<Productos> {
    return this.http.get<Productos>(`${this.productosURL}${IdProducto}`);
  }

  public registrarProducto(producto: Productos): Observable<any> {
    return this.http.post<any>(`${this.productosURL}`, producto);
  }

  /*public editar(IdProducto: number, producto: Productos): Observable<any> {
    return this.http.put<any>(`${this.productosURL}${IdProducto}`, producto);
  } */

  public desactivarProducto(IdProducto: number, producto: Productos): Observable<any> {
    return this.http.put<any>(this.productosURL + `desactivar/${IdProducto}`, producto);
  }

  public activarProducto(IdProducto: number, producto: Productos): Observable<any> {
    return this.http.put<any>(this.productosURL + `activar/${IdProducto}`, producto);
  }
}
  