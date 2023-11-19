import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/route'
  }

  getPersonas(): Observable<Persona[]>{
    return this.http.get<Persona[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
}
