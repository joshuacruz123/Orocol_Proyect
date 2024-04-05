import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TokenService } from '../services/token.service';
import { UsuarioService } from '../services/usuario.service';
import { TokenDto } from '../models/token.dto';

export const errorTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenService);
  const usuario = inject(UsuarioService);

  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        const dto: TokenDto = new TokenDto(token.getToken());
        return usuario.refreshToken(dto).pipe(
          switchMap((data: any) => {
            token.setToken(data.token);
            const authReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${data.token}`
              }
            });
            console.log('Refrescando token ...');
            return next(authReq);
          }),
          catchError(error => {
            token.logOut();
            return throwError(error);
          })
        );
      } else {
        return throwError(err);
      }
    })
  );
};
/* 
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { UsuarioService } from '../services/usuario.service';
import { TokenDto } from '../models/token.dto';
import { catchError, switchMap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenService);
  const usuarioService = inject(UsuarioService);
  const consegirToken = token.getToken();

  if (token.getToken()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.getToken()}`
      }
    });//return next(authReq);
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && token.getToken()) {
        return usuarioService.refreshToken({ consegirToken }).pipe(
          switchMap((response: any) => {
            const newToken = response.token.getToken();
            token.setToken(newToken);

            const authReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });

            return next(authReq);
          }),
          catchError((refreshError: any) => {
            return throwError(error);
          })
        );
      } else {
        return throwError(error);
      }
    })
  );
}
*/