import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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


  // Array destiné à l'utilisation de *ngFor
  users = [
    {
      name: 'kiki',
      status: 'codeur'
    },
    {
      name: 'toto',
      status: 'vip'
    },
    {
      name: 'tata',
      status: 'farmer'
    }
  ];

  // Execute ce code à l'instanciation du composant
  constructor() {
    setTimeout(() => {
      this.isAuth = true;
    }, 4000);
  };

  onAllumer() {
    console.log('allumé');
  }
}
