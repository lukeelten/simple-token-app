import {Injectable} from "@angular/core";
import Keycloak, {KeycloakInitOptions} from "keycloak-js";
import {Observable} from "rxjs";
import { from } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class KeycloakService {

    private keycloak: Keycloak;

    public constructor(private http: HttpClient) {
        this.keycloak = new Keycloak({
            url: 'https://sso.lukeelten.de/',
            realm: 'webauthn',
            clientId: 'simple-app'
        });
    }

    private requireLogin(): Observable<boolean> {
        return from(this.keycloak.init({
            onLoad: "login-required",
            checkLoginIframe: false
        }));
    }

    public loginWithWebAuthn(): Observable<string> {
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

    private getTokenEndpoint(): Observable<string> {
        return new Observable((observer) => {
            this.http.get("https://sso.lukeelten.de/realms/webauthn/.well-known/openid-configuration").subscribe((data: any) => {
                observer.next(data["token_endpoint"]);
            })
        });
    }

    public loginWithClientCredentials(): Observable<string> {
        return new Observable((observer) => {
            this.getTokenEndpoint().subscribe((tokenEndpoint) => {
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type':  'application/x-www-form-urlencoded'
                    })
                };

                const formData = new URLSearchParams();
                formData.append("client_id", "client");
                formData.append("client_secret", "ovbZ40fJWmhpeTa8H26283mEfa8jHw2w");
                formData.append("grant_type", "client_credentials");

                this.http.post<ClientCredentials>(tokenEndpoint, formData, httpOptions).subscribe((data) => observer.next(data.access_token));
            })
        });
    }
}

interface ClientCredentials {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}