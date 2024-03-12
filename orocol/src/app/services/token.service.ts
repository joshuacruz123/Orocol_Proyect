import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
  
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') ?? ''; 
  }

  getUser(): { 
    nombreUsuario: string;
    apellidosUsuario: string;
    correoUsuario: string;
    estadoUsuario: string;
    roles: string;
  } | null { 
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const datosUsuario = {
      nombreUsuario: valuesJson.nombreUsuario,
      apellidosUsuario: valuesJson.apellidosUsuario,
      correoUsuario: valuesJson.correoUsuario,
      estadoUsuario: valuesJson.estadoUsuario,
      roles: valuesJson.roles
    };
    return datosUsuario;
  }

  logOut(): void {
    localStorage.clear();
  }
  
  isAdmin(): boolean {
    if (!this.isLogged()) {
      return false; 
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const roles = valuesJson.roles;
    if (roles.indexOf('Administrador') < 0) {
      return false;
    }
    return true;
  } 

  isRoles() {
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const roles = valuesJson.roles;
    return {
      roles: valuesJson.roles
    };
  }
} 
