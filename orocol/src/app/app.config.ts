import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from "@angular/common/http";
import { provideToastr } from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), provideAnimations(), provideToastr()]
};