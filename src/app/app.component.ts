import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';
import {AppareilService} from './services/appareil.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'super appli de fou';
  isAuth: boolean = false;
  // lastUpdate = new Date();
  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });
  // Utilisation de ces var pour le property binding (donc, entre crochet)
  appareilOne = 'Liseuse';
  appareilTwo = 'Ordinateur';
  appareilThree = 'Nas';

  users: any[];
  appareils: any[];

  /**
   * Le constructeur est executé à l'instanciation du composant
   *
   * @param appareilService : Injection d'une instance du service des appareils
   * @param userService : injection d'une instance de service des users
   */
  constructor(private appareilService: AppareilService, private userService: UserService) {
    setTimeout(() => {
      this.isAuth = true;
    }, 4000);
  }

  /**
   * Executé au moment de la creation du component, mais apres l'execution du constructor
   * Initialise un service
   */
  ngOnInit(): void {
    // this.users = this.userService.users;
  }


  onAllumer() {
    console.log('allumé');
  }

  onEteindre() {
    console.log('éteint');
  }

  /*  // Met tous les users à la retraite en appelant la methode retireall() du service des Users
   retireAll() {
   this.userService.retireAll();
   }

   // Met tous les Users comme etant actifs en appelant la methode activeAll() du services des Users
   activeAll() {
   this.userService.activeAll();
   }*/
}
