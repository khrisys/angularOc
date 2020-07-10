import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'super appli de fou';
  isAuth: boolean = false;

  // Utilisation de ces var pour le property binding (donc, entre crochet)
  appareilOne = 'Liseuse';
  appareilTwo = 'Ordinateur';
  appareilThree = 'Nas';

  constructor() {
    setTimeout(() => {
      this.isAuth = true;
    }, 4000);
  };

  onAllumer() {
    console.log('allumé');
  }
}
