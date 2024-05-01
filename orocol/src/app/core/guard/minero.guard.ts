import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const mineroGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const usuario = tokenService.getUser();
  if (usuario && usuario.roles.includes('Minero')) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
