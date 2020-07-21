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
import {AuthService} from './services/auth.service';
import {SingleUserComponent} from './single-user/single-user.component';

// Declaration des routes correspondant aux composant que l'on appelle grace aux URLs'
const appRoutes: Routes = [
  {path: 'users', component: UserViewComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'user', component: UsersComponent},
  {path: 'users/:id', component: SingleUserComponent},
  {path: '', component: UserViewComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AppareilComponent,
    AuthComponent,
    UserViewComponent,
    SingleUserComponent
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
    UserService,
    AuthService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

