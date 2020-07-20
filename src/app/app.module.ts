import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {AppareilComponent} from './appareil/appareil.component';
import {FormsModule} from '@angular/forms';
import {AppareilService} from './services/appareil.service';
import {UserService} from './services/user.service';
import {AuthComponent} from './auth/auth.component';
import {UserViewComponent} from './user-view/user-view.component';
import {RouterModule, Routes} from '@angular/router';

// Declaration des routes correspondant aux composant que l'on appelle via les URLs'
const appRoutes: Routes = [
  {path: 'users', component: UserViewComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'user', component: UsersComponent},
  {path: '', component: UserViewComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AppareilComponent,
    AuthComponent,
    UserViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes) //Ca dit que toutes les routes qu'on veut enregistrer dans ce projet se trouvent dans la const
    // 'appRoutes'
  ],
  providers: [
    // Injection du service au niveau du module : une seule instance crééé
    AppareilService,
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

