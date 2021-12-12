import {NgModule} from '@angular/core';

import {WelcomeRoutingModule} from './welcome-routing.module';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {SharedModule} from "../../shared/shared.module";
import { ModulComponent } from './modul/modul.component';
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzInputModule} from "ng-zorro-antd/input";


@NgModule({
  declarations: [
    WelcomePageComponent,
    ModulComponent,
  ],
  imports: [
    SharedModule,
    WelcomeRoutingModule,
    NzIconModule,
    NzSpaceModule,
    NzCardModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzDropDownModule,
    NzInputModule
  ],
  providers: [
    { provide: 'A', useValue: 1231111111111111111111111111}   // define a string token
  ]
})

export class WelcomeModule {
}
