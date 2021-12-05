import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {UserComponent} from "./components/user/user.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {title: "login widget-it"}
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {title: "register widget-it"}
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {title: "reset-password widget-it"}
  },
  {
    path: "",
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
