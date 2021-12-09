import {NgModule} from '@angular/core';

import {WelcomeRoutingModule} from './welcome-routing.module';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {SharedModule} from "../../shared/shared.module";
import { ModulComponent } from './modul/modul.component';


@NgModule({
  declarations: [
    WelcomePageComponent,
    ModulComponent
  ],
  imports: [
    SharedModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule {
}
