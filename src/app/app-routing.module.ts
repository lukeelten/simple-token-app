import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from "./start/start.component";
import {WebauthnComponent} from "./webauthn/webauthn.component";
import {OidcComponent} from "./oidc/oidc.component";
import {ClientcredComponent} from "./clientcred/clientcred.component";

const routes: Routes = [
  {
    path: '',
    component: StartComponent
  },
  {
    path: 'webauthn',
    component: WebauthnComponent
  },  {
    path: 'oidc',
    component: OidcComponent
  },  {
    path: 'client',
    component: ClientcredComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
