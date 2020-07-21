import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  // le status d'un user par defaut sera à l'etat actif
  defaultStatus = 'actif';

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  /**
   * Methode permettant de recuperer toutes les données du formulaire (name et status), puis d'ajouter un user à la liste des users et
   * enfin de diriger l'utilisateur vers la page de la liste des users
   *
   * @param form : formulaire d'edition des users
   */
  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const status = form.value['status'];
    this.userService.addUser(name, status);
    this.router.navigate(['/users']);
  }

}
