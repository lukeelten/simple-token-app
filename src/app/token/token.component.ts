import {AfterContentInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
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
export class TokenComponent implements OnChanges,AfterContentInit {
  @Input({
    required: true
  })
  token: string | null = "";

  public header: string = "";
  public claims: string = "";
  public signature: string = "";

  private decoded = false;

  public constructor() {
  }

  get claimsRows(): number {
    return Math.max(8, this.claims.split("\n").length);
  }
  get headerRows(): number {
    return this.header.split("\n").length;
  }

  get decodeButtonLabel(): string {
    if (this.decoded) {
      return "Encode Token";
    }

    return "Decode Token";
  }

  public toggleDecode() {
    if (this.decoded) {
      this.encode();
    } else {
      this.decode();
    }
  }

  private decode() {
    if (!this.token || this.token?.length == 0) {
      return;
    }

    const parsedHeader = JSON.parse(decode(this.header));
    const parsedClaims = JSON.parse(decode(this.claims));

    this.header = JSON.stringify(parsedHeader, null, 4);
    this.claims = JSON.stringify(parsedClaims, null, 4);

    this.decoded = true;
  }

  private encode() {
    this.decoded = false;
    this.parseToken();
  }

  private parseToken() {
    if (!this.token || this.token?.length == 0) {
      return;
    }

    let parts = this.token.split(".")
    if (parts.length < 3) {
      console.error("Invalid token given: " + this.token);
      return;
    }

    this.header = parts[0];
    this.claims = parts[1];
    this.signature = parts[2];

    if (this.decoded) {
      this.decode();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngAfterContentInit();
  }

  ngAfterContentInit(): void {
    this.parseToken();
  }
}
