import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideToastr } from "ngx-toastr";
import { tokenInterceptor } from "./auth/interceptor/token.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), 
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideAnimations(), provideToastr()]
};
/* 
NullInjectorError: NullInjectorError: No provider for _TokenInterceptor!
    at NullInjector.get (core.mjs:4674:27)
    at R3Injector.get (core.mjs:5117:33)
    at R3Injector.get (core.mjs:5117:33)
    at injectInjectorOnly (core.mjs:3831:40)
    at ɵɵinject (core.mjs:3837:42)
    at inject (core.mjs:3921:12)
    at interceptor (token.interceptor.ts:14:34)
    at http.mjs:1732:84
    at runInInjectionContext (core.mjs:5416:16)
    at http.mjs:1732:46
*/