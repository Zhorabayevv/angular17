import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
    HttpClient,
    HttpClientModule,
    provideHttpClient,
    withInterceptors,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { tokenInterceptor } from './shared/interceptors/token.interceptor';
import { AlertService } from './shared/services/alert.service';
import { LoginService } from './pages/login/services/login.service';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

export const provideTranslation = () => ({
    defaultLanguage: localStorage.lang || 'ru',
    loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
    },
});

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        AlertService,
        LoginService,
        provideHttpClient(withInterceptors([tokenInterceptor])),
        importProvidersFrom([
            HttpClientModule,
            BrowserModule,
            BrowserAnimationsModule,
            TranslateModule.forRoot(provideTranslation()),
        ]),
    ],
};
