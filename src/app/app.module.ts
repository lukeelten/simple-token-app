import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { TokenComponent } from './token/token.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8080',
          realm: 'your-realm',
          clientId: 'your-client-id'
        },
        initOptions: {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
              window.location.origin + '/assets/silent-check-sso.html'
        }
      });
}

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    TokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
