import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserComponent} from './components/user/user.component';
import {NgxColorsModule} from "ngx-colors";
import {User} from "../../models/user.model";
import {ApiService} from "../../core/services/api.service";
import {NzButtonModule} from "ng-zorro-antd/button";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    NgxColorsModule,
    ReactiveFormsModule,
    NzButtonModule
  ]
})
export class UserModule {
  constructor() {
  }



}


