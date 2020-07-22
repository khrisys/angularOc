import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from '../models/User.model';
import {Subscription} from 'rxjs';
import {UserModelService} from '../services/user-model.service';

@Component({
  selector: 'app-user-model-list',
  templateUrl: './user-model-list.component.html',
  styleUrls: ['./user-model-list.component.css']
})
export class UserModelListComponent implements OnInit, OnDestroy {

  users: UserModel[];
  userModelSubscription: Subscription;

  constructor(private userModelservice: UserModelService) {
  }

  /**
   * Dès la creation de l'objet UserModelListComponent, il va se souscrire au Subject du service et il le fera emettre.
   */
  ngOnInit(): void {
    // creer la subscritpion
    this.userModelSubscription = this.userModelservice.userModelSubject.subscribe(
      (users: UserModel[]) => {
        this.users = users;
      }
    );
    // emettre le subject
    this.userModelservice.emitUserModel();
  }

  /**
   * Permet de detruire la souscription
   */
  ngOnDestroy(): void {
    this.userModelSubscription.unsubscribe();
  }

}
