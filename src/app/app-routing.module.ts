import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartComponent} from "./start/start.component";
import {TokenComponent} from "./token/token.component";

const routes: Routes = [
  {
    path: '',
    component: StartComponent
  },
  {
    path: '/token',
    component: TokenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
