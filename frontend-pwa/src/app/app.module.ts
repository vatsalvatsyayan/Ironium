import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { CallbackComponent } from './components/callback/callback.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegistrationRouterComponent } from './components/registration-router/registration-router.component';

@NgModule({
  declarations: [AppComponent, RegistrationComponent, LoginComponent, CallbackComponent, LogoutComponent, RegistrationRouterComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
            ReactiveFormsModule,
            AuthModule.forRoot({
              domain: 'dev-6ztx7jb2twrna510.us.auth0.com',
              clientId: '4NqVSDiUS60mNQh50QauYr18K5EpO2Iz',
              authorizationParams: {
                redirect_uri: 'http://localhost:8100/callback',
                audience: 'http://localhost:8080',
                scope: 'openid profile email',
                useCookiesForTransactions: true
              },
              httpInterceptor: {
                allowedList: [
                  {
                    uri: 'http://localhost:8080/*',
                    tokenOptions: {
                      authorizationParams: {
                        audience: 'http://localhost:8080',
                        scope: 'openid profile email'
                      }
                    }
                  }
                ]
              }
            }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent],
})
export class AppModule {}
