import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() userName: string;
  @Input() userStatus: string;
  // recupere l'index d'un tableau de User. Est necessaire si on veut retrouver un element precis d'un tableau d'objet que l'in recupere
  // depuis l'appel vers une API. Cela permet d'effectuer un traitement sur un composant precis dans un tab d'objet.
  @Input() indexOfUser: number;

  /**
   * Instanciation d'un composant User
   *
   * @param userService : instanciation du service User pour utiliser les methodes propres à un seul composant User
   */
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  // ===============================================================
  // Ces methodes personalisées sont uniquement destinées au composant "User"
  // ===============================================================

  onRetire() {
    this.userService.retireOne(this.indexOfUser);
  }

  onActif() {
    this.userService.activeOne(this.indexOfUser);
  }

}
