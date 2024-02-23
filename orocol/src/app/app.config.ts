import { provideAnimations } from "@angular/platform-browser/animations";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideRouter(routes), provideAnimationsAsync(), provideHttpClient()]
};
//import { TuiRootModule } from "@taiga-ui/core";
// importProvidersFrom(TuiRootModule) 