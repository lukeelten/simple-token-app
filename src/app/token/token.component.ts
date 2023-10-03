import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {KeycloakService} from "../services/KeycloakService";
import {Subscription} from "rxjs";
import {decode} from "js-base64";

@Component({
  selector: 'app-token',
  templateUrl: "token.html",
  styleUrls: [
      "token.scss"
  ]
})
export class TokenComponent implements OnInit,OnDestroy {
  private sub: Subscription | null = null;

  public tokenHtml: string = "";

  @Input({
    required: true
  })
  token: string = "";


  public constructor(private keycloakService: KeycloakService) {
  }

  ngOnInit(): void {
    this.sub = this.keycloakService.getToken().subscribe((token) => {
      this.setToken(token);
    }, (err) => {
      console.log(err);
    })
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private setToken(token: string) {
    let parts = token.split(".")
    let html = "";

    const keyPart = decode(parts[0]);
    const userPart = decode(parts[1]);
    const signatur = parts[2];

    html += "<p class=\"keypart\">" + keyPart + "</p>";
    html += "<p class=\"userpart\">" + userPart + "</p>";
    html += "<p class=\"signatur\">" + signatur + "</p>";

    this.tokenHtml = html;
  }






}
