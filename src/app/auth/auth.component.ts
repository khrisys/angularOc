import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authStatus: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }

  /**
   * Comme la methode signIn est async, on utilise le "then()" pour prendre en charge le coté async
   * Le router permet de naviguer vers un ou plusieurs composants precis lors de l'authentification (ici, on va vers le composant des
   * utilisateurs)
   */
  onSignIn() {
    this.authService.signIn().then(() => {
      console.log('connecté !');
      this.authStatus = this.authService.isAuth;
      this.router.navigate(['users']);
    });
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }
}
