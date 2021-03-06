import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {HeaderComponent} from "./core/header/header.component";
import {FooterComponent} from "./core/footer/footer.component";
import {CommonModule, registerLocaleData} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {de_DE, NZ_I18N} from 'ng-zorro-antd/i18n';
import de from '@angular/common/locales/de';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzButtonModule} from "ng-zorro-antd/button";

registerLocaleData(de);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NzButtonModule
  ],
  providers: [{provide: NZ_I18N, useValue: de_DE}],
  bootstrap: [AppComponent]
})
export class AppModule {

}
