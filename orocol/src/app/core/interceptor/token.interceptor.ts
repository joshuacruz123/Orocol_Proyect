import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenService);
  if (token.getToken()) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.getToken()}`
      }
    });
    return next(authReq);
  }
  return next(req);
};
/*
import { UsuarioService } from '../services/usuario.service';
import { TokenDto } from '../models/token.dto';

  const usuario = inject(UsuarioService);
  const errResponse = inject(HttpErrorResponse);
  if (errResponse.error.status === 401) {
    const dto: TokenDto = new TokenDto(token.getToken());
    return usuario.refreshToken(dto).pipe(((data: any) => {
      token.setToken(data.token);
       const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${data.token.getToken()}`
        }
      });
      return next(authReq);
    }));
  }
  
  else {
    token.logOut();
    return throwError(err);
  } */