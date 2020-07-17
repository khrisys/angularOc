import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {AppareilComponent} from './appareil/appareil.component';
import {FormsModule} from '@angular/forms';
import {AppareilService} from './services/appareil.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AppareilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    // Injection du service au niveau du module : une seule instance crééé
    AppareilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
