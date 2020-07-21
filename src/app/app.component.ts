import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppareilService} from './services/appareil.service';
import {Observable, Subscription} from 'rxjs';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'super appli de fou';
  isAuth: boolean = false;
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

  //Observer
  secondes: number;
  // Gestion de bug dû à un Observable de type infini
  counterSubscription: Subscription;


  /**
   * Le constructeur est executé à l'instanciation du composant
   *
   * @param appareilService : Injection d'une instance du service des appareils
   * @param userService : injection d'une instance de service des users
   */
  constructor(private appareilService: AppareilService) {
    setTimeout(() => {
      this.isAuth = true;
    }, 4000);
  }

  /**
   * Executé au moment de la creation du component, mais apres l'execution du constructor
   *
   * Dans ce cas, on initialise un observable avec un interval d'une seconde. Il faut importer Observable, mais aussi
   * 'rxjs/add/observable/interval', et surtout, avec les MAJ qu'il y a eu dans RxJS, il faut installer le package 'rxjs-compat' pour
   * pouvoir utiliser cette methode 'interval'
   *
   * Pour eviter tout pb lorsqu'on utilise des Observable perso, il est vivement conseillé d'utiliser la souscription via l'objet
   * Subscription
   */
  ngOnInit(): void {
    const counter = Observable.interval(1000);

    // subscribe() comprend 3  fonctions anonymes, pour gerer les 3 types d'informations que cet Observable peut envoyer
    // Subsbription permet d'eviter les bugs dus à Observable de comportement infini. En effet, en ayant créé counterSubscription, on
    // peut desormais la detruire (dans la methode qu'on va creer plus bas), et ainsi eviter de gros bugs
    this.counterSubscription = counter.subscribe((value) => {
        this.secondes = value;
      },
      (error) => {
        console.log('Uh-Oh, an error occured : ' + error);
      },
      () => {
        console.log('Observable complete !');
      });
  }

  /**
   * Methode permettant de detruire la souscription (grace à 'unsubscribe()') à la fin de vie du component, et empeche ainsi les
   * comportements innatendus liés aux Observable infinis
   */
  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }


  onAllumer() {
    console.log('allumé');
  }

  onEteindre() {
    console.log('éteint');
  }
}
