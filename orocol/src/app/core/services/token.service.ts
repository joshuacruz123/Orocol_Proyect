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
    idUsuario: number;
    roles: string; 
    idAdmin?: number;
    IdMinero?: number;
  } | null {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    let camposEspecificos;
    if (valuesJson.roles.indexOf('Minero') >= 0) {
      camposEspecificos = {
        IdMinero: valuesJson.IdMinero,
    };
    } else if (valuesJson.roles.indexOf('Administrador') >= 0) {
      camposEspecificos = {
        idAdmin: valuesJson.idAdmin,
    };
    }
    const datosUsuario = {
      idUsuario: valuesJson.idUsuario,
      roles: valuesJson.roles,
      ...camposEspecificos
    };
    return datosUsuario;
  }

  logOut(): void {
    localStorage.clear();
  }
  
  validarPermisosUsuarios(): boolean {
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

  validarRoles() {
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
