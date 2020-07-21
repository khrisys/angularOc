import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';


/**
 * CanActivate est une interface qui oblige à redefinir la methode canActivate
 *
 * @Injectable : permet d'injecter un service dans un autre service
 */
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Methode permettant d'empecher un user d'acceder à une ou plusieurs url que l'on defini sans etre authentifié.
   * On retourne soit une Observable, soit une Promise, ou une booleenne à 'true' si l'user a le droit d'acceder à l'url (la route)
   * voulue.Si ce n'est pas le cas, soit on peut retourner 'false', soit on peut rediriger l'user vers la page d'authentification
   *
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuth) {
      return true;
    } else {
      this.router.navigate(['/auth']);
    }
  }

}

