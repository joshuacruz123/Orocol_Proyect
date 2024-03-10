import { catchError, concatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { TokenService } from '../../services/token.service';
import { TokenDto } from '../../models/token.dto';

const AUTHORIZATION = 'Authorization';
const BEARER = 'Bearer ';

@Injectable()
export class RutasInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private usuarioService: UsuarioService
    ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.tokenService.isLogged()) {
      return next.handle(request);
    }
    let intReq = request;
    const token = this.tokenService.getToken();
    intReq = this.addToken(request, token);
    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const dto: TokenDto = new TokenDto(token);
        return this.usuarioService.refreshToken(dto).pipe(concatMap((data: any) => {
          console.log('refreshing...');
          this.tokenService.setToken(data.token);
          intReq = this.addToken(request, data.token);
          return next.handle(intReq);
        }));
      } else {
        this.tokenService.logOut();
        return throwError(err);
      }
    }));
  }

  private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
  }
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: RutasInterceptor, multi: true }];

/* 
export const rutasInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
------------------------------------------------------------------------------------------------------------------------------------------------------
import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptorFn, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { TokenService } from '../../services/token.service';
import { UsuarioService } from '../../services/usuario.service';
import { TokenDto } from '../../models/token.dto';

const AUTHORIZATION = 'Authorization';
const BEARER = 'Bearer ';

export const rutasInterceptor: HttpInterceptorFn = /* Type '(req: HttpRequest<any>, next: HttpHandler) => Observable<HttpEvent<any>>' is not assignable to type 'HttpInterceptorFn'.
    Types of parameters 'next' and 'next' are incompatible.
    Type 'HttpHandlerFn' is not assignable to type 'HttpHandler'.ts(2322)
    const rutasInterceptor: HttpInterceptorFn //
    (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
      const tokenService = new TokenService();
      const usuarioService = new UsuarioService(); /* Expected 1 arguments, but got 0.ts(2554)
      usuario.service.ts(11, 15): An argument for 'http' was not provided.
      (alias) new UsuarioService(http: HttpClient): UsuarioService
      import UsuarioService
      //
      if (!tokenService.isLogged()) {
        return next.handle(req);
      }
  
      let intReq = req;
      const token = tokenService.getToken();
      intReq = addToken(req, token);
  
      return next.handle(intReq).pipe(
        catchError((err: any) => {
          if (err.status === 401) {
            const dto: TokenDto = new TokenDto(token);
            return usuarioService.refreshToken(dto).pipe(
              concatMap((data: any) => {
                console.log('refreshing...');
                tokenService.setToken(data.token);
                intReq = addToken(req, data.token);
                return next.handle(intReq);
              })
            );
          } else {
            tokenService.logOut();
            return throwError(err);
          }
        })
      );
  };
  
  function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ headers: request.headers.set(AUTHORIZATION, BEARER + token) });
  }
------------------------------------------------------------------------------------------------------------------------------------------------------
import { catchError, concatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { TokenService } from '../../services/token.service';
import { TokenDto } from '../../models/token.dto';

const AUTHORIZATION = 'Authorization';
const BEARER = 'Bearer ';

@Injectable()
export class RutasInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private usuarioService: UsuarioService
    ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.tokenService.isLogged()) {
      return next.handle(request);
    }
    let intReq = request;
    const token = this.tokenService.getToken();
    intReq = this.addToken(request, token);
    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const dto: TokenDto = new TokenDto(token);
        return this.usuarioService.refreshToken(dto).pipe(concatMap((data: any) => {
          console.log('refreshing...');
          this.tokenService.setToken(data.token);
          intReq = this.addToken(request, data.token);
          return next.handle(intReq);
        }));
      } else {
        this.tokenService.logOut();
        return throwError(err);
      }
    }));
  }

  private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
  }
}

export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: RutasInterceptor, multi: true }];
*/