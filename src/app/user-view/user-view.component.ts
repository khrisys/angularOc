import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  users: any[];
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

  ngOnInit(): void {
    this.users = this.userService.users;
  }

  // ===============================================================
  // Ces methodes personalisées sont uniquement destinées au composant "User", mais sont générales à toute l'appli
  // ===============================================================

  // Met tous les users à la retraite en appelant la methode retireall() du service des Users
  retireAll() {
    this.userService.retireAll();
  }

  // Met tous les Users comme etant actifs en appelant la methode activeAll() du services des Users
  activeAll() {
    if (confirm('Etes vous sur de vouloir envoyer tous les users à la retraite ?')) {
      this.userService.activeAll();
    } else {
      return null;
    }
  }
}
