import { Injectable } from '@angular/core';
import {
  HttpRequest
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor {

  constructor( ) { }

  addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
  }
}
/* 
import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
----------------------------------------------------------------------------
import { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { TokenService } from "../../services/token.service";
import { TokenInterceptor } from "./token.interceptor";
import { catchError, concat, concatMap, throwError } from "rxjs";
import { TokenDto } from "../../models/token.dto";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
//(req: HttpRequest<unknown>, next: HttpHandler) arguments caller prototype
  const usuarioService = inject(UsuarioService);
  const tokenService = inject(TokenService);
  const tokenInterceptor = inject(TokenInterceptor);
  if (!tokenService.isLogged()) {
    return next(req);
  }
  let intReq = req;
  const token = tokenService.getToken();
  intReq = tokenInterceptor.addToken(req, token);
  return next(intReq).pipe(catchError((err: HttpErrorResponse) => {
    if (err.status === 401) {
      const dto: TokenDto = new TokenDto(token);
      return usuarioService.refreshToken(dto).pipe(concatMap((data: any) => {
        console.log('refreshing...');
        tokenService.setToken(data.token);
        intReq = tokenInterceptor.addToken(req, data.token);
        return next(intReq);
      }));
    } else {
      tokenService.logOut();
      return throwError(err);
    }
  }));
};
*/