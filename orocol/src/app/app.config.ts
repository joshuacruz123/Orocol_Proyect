import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideToastr } from "ngx-toastr";
import { tokenInterceptor } from "./core/interceptor/token.interceptor";
import { errorTokenInterceptor } from "./core/interceptor/error-token.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), 
    provideHttpClient(withInterceptors([tokenInterceptor, errorTokenInterceptor])),
    provideAnimations(), provideToastr()]
};
