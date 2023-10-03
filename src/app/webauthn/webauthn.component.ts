import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {KeycloakService} from "../services/KeycloakService";

@Component({
  templateUrl: "webauthn.html",
  styles: [
  ]
})
export class WebauthnComponent implements OnInit {
  public token: Observable<string> = new Observable<string>();

  public constructor(private keycloak: KeycloakService) {
  }

  ngOnInit(): void {
    this.token = this.keycloak.loginWithWebAuthn();
  }
}
