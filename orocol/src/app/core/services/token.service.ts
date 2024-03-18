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
    nombreUsuario: string;
    apellidosUsuario: string;
    correoUsuario: string;
    estadoUsuario: string;
    roles: string; 
    idAdmin?: number;
    cargoAdmin?: string;
    IdMinero?: number; // Make IdMinero optional
    tipo_documento?: string;
    numero_documento?: number;
    telefono?: number;
    fecha_nacimiento?: Date;
    direccion_vivienda?: string;
    cambio_documento?: string;
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
        tipo_documento: valuesJson.tipo_documento,
        numero_documento: valuesJson.numero_documento,
        cambio_documento: valuesJson.cambio_documento,
        telefono: valuesJson.telefono,
        fecha_nacimiento: valuesJson.fecha_nacimiento,
        direccion_vivienda: valuesJson.direccion_vivienda,
    };
    } else if (valuesJson.roles.indexOf('Administrador') >= 0) {
      camposEspecificos = {
        idAdmin: valuesJson.idAdmin,
        cargoAdmin: valuesJson.cargoAdmin,
    };
    }
    const datosUsuario = {
      idUsuario: valuesJson.idUsuario,
      nombreUsuario: valuesJson.nombreUsuario,
      apellidosUsuario: valuesJson.apellidosUsuario,
      correoUsuario: valuesJson.correoUsuario,
      estadoUsuario: valuesJson.estadoUsuario,
      roles: valuesJson.roles,
      ...camposEspecificos
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
