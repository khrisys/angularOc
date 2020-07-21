import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  users: any[];
  userSubscription: Subscription;
  isAuth: boolean = false;

  /*  lastUpdate = new Promise((resolve, reject) => {
   const date = new Date();
   setTimeout(
   () => {
   resolve(date);
   }, 2000
   );
   });*/

  constructor(private userService: UserService) {
    setTimeout(() => {
      this.isAuth = true;
    }, 2000);
  }

  /**
   * Avec la couche d'abstraction aux données recues (tableau json), on ne peut plus acceder directement aux données. Ainsi, on associe
   * nos données souscrites à notre var locale 'users'.
   * Puis, apres la sousscription, on va faire emettre le subject (le subject va emettre la copie des users du service).
   */
  ngOnInit(): void {
    // this.users = this.userService.users;
    this.userSubscription = this.userService.userSubject.subscribe(
      (users: any[]) => {
        this.users = users;
      }
    );
    this.userService.emitUserSubject();
  }

  // ===============================================================
  // Ces methodes personalisées sont uniquement destinées au composant "User", mais sont générales à toute l'appli
  // ===============================================================

  // Met tous les users à la retraite en appelant la methode retireall() du service des Users
  activeAll() {
    this.userService.activeAll();
  }

  // Met tous les Users comme etant actifs en appelant la methode activeAll() du services des Users
  retireAll() {
    if (confirm('Etes vous sur de vouloir envoyer tous les users à la retraite ?')) {
      this.userService.retireAll();
    } else {
      return null;
    }
  }
}
