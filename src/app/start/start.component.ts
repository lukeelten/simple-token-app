import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: "start.html",
  styles: [
      `
        .container-fluid {
          padding-top: 3rem;
        }
      `
  ]
})
export class StartComponent {

  public constructor(private router: Router) {
  }

  public LoginWebauthn() {
    this.router.navigate(['webauthn']);
  }

  public ClientDemo() {
    this.router.navigate(['webauthn']);
  }

}
