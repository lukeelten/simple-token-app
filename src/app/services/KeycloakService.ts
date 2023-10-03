import {Injectable} from "@angular/core";
import Keycloak, {KeycloakInitOptions} from "keycloak-js";
import {Observable} from "rxjs";
import { from } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class KeycloakService {

    private keycloak: Keycloak;

    public constructor() {
        this.keycloak = new Keycloak({
            url: 'https://sso.lukeelten.de/',
            realm: 'webauthn',
            clientId: 'simple-app'
        })
    }

    public init(options: KeycloakInitOptions) : Observable<boolean> {
        return from(this.keycloak.init(options));
    }

    public requireLogin(): Observable<boolean> {
        return this.init({
            onLoad: "login-required",
            checkLoginIframe: false
        })
    }

    public getToken(): Observable<string> {
        if (!this.keycloak.authenticated) {
            return new Observable<string>((observer) => {
               this.requireLogin().subscribe((authenticated) => {
                   if (authenticated) {
                       observer.next(this.keycloak.token);
                   } else {
                       observer.error("cannot get token");
                   }
                });
            });
        } else {
            return new Observable<string>((observer) => {
                observer.next(this.keycloak.token);
            });
        }
    }
}