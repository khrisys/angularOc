import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {AppareilComponent} from './appareil/appareil.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppareilService} from './services/appareil.service';
import {UserService} from './services/user.service';
import {AuthComponent} from './auth/auth.component';
import {UserViewComponent} from './user-view/user-view.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './services/auth.service';
import {SingleUserComponent} from './single-user/single-user.component';
import {Error404Component} from './error404/error404.component';
import {AuthGuardService} from './services/auth-guard.service';
import {EditUserComponent} from './edit-user/edit-user.component';
import {UserModelListComponent} from './user-model-list/user-model-list.component';
import {UserModelService} from './services/user-model.service';
import {NewUserModelComponent} from './new-user-model/new-user-model.component';
import {HttpClientModule} from '@angular/common/http';

/**
 * Declaration des routes correspondant aux composant que l'on appelle grace aux URLs
 * La param canActivate correspond au guard qui empeche tous utilisateurs non connectés d'acceder à cette route
 */

const appRoutes: Routes = [
  {path: 'users', canActivate: [AuthGuardService], component: UserViewComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'user', canActivate: [AuthGuardService], component: UsersComponent},
  {path: 'users/:id', canActivate: [AuthGuardService], component: SingleUserComponent},
  {path: 'user', canActivate: [AuthGuardService], component: UserViewComponent},
  {path: 'user-model-list', component: UserModelListComponent},
  {path: 'new-user-model', component: NewUserModelComponent},
  {path: 'edit-user', canActivate: [AuthGuardService], component: EditUserComponent},
  {path: 'not-found', component: Error404Component},
  {path: '', canActivate: [AuthGuardService], component: UserViewComponent},
  {path: '**', redirectTo: '/not-found'} // path wildcard : redirection vers la page 404. IL EST ESSENTIEL DE METTRE LE PATH WILDCARD A
  // LA FIN DES PATH, car Angular regarde les path dans l'rodre de declaration. Si le wildcard est au milieu du tab de path, si Angular
  // tombe sur le wildcard, n'importe quelle route correspond au wildcard, et donc, tous les urls rentrés vont correspondre à ce wildcard
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AppareilComponent,
    AuthComponent,
    UserViewComponent,
    SingleUserComponent,
    Error404Component,
    EditUserComponent,
    UserModelListComponent,
    NewUserModelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes) //Ca dit que toutes les routes qu'on veut enregistrer dans ce projet se trouvent dans la const
    // 'appRoutes'
  ],
  providers: [
    // Injection du service au niveau du module : une seule instance crééé
    AppareilService,
    UserService,
    AuthService,
    AuthGuardService,
    UserModelService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

