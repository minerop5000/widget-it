import {NgModule} from '@angular/core';

import {WelcomeRoutingModule} from './welcome-routing.module';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {SharedModule} from "../../shared/shared.module";
import { ModulComponent } from './modul/modul.component';
import { CreatorComponent } from './creator/creator.component';
import {NzIconModule} from "ng-zorro-antd/icon";


@NgModule({
  declarations: [
    WelcomePageComponent,
    ModulComponent,
    CreatorComponent
  ],
  imports: [
    SharedModule,
    WelcomeRoutingModule,
    NzIconModule
  ]
})
export class WelcomeModule {
}
