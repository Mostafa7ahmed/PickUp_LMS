import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import en from '@angular/common/locales/en';
import { headersInterceptor } from './Core/interceptors/headers.interceptor';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import * as echarts from 'echarts';
registerLocaleData(en);


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideHttpClient(withFetch(), withInterceptors([headersInterceptor])),
    { provide: NGX_ECHARTS_CONFIG, useValue: { echarts } },
    provideAnimationsAsync(), // ✅ تم إصلاح الفاصلة

    providePrimeNG({ 
        theme: {
            preset: Aura
        }
    }),
     provideNzI18n(en_US),
  ],
};
