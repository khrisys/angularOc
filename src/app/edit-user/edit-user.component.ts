import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  // le status d'un user par defaut sera à l'etat actif
  defaultStatus = 'actif';

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Methode permettant de recuperer toutes les données du formulaire
   * @param form : formulaire d'edition des users
   */
  onSubmit(form: NgForm) {
    console.log(form.value);
  }

}
