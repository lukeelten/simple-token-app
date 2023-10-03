import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { TokenComponent } from './token/token.component';
import {KeycloakService} from "./services/KeycloakService";
import {FormsModule} from "@angular/forms";
import { WebauthnComponent } from './webauthn/webauthn.component';
import { OidcComponent } from './oidc/oidc.component';
import { ClientcredComponent } from './clientcred/clientcred.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    TokenComponent,
    WebauthnComponent,
    OidcComponent,
    ClientcredComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
      KeycloakService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
