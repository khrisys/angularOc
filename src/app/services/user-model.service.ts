import {UserModel} from '../models/User.model';
import {Subject} from 'rxjs';

export class UserModelService {

  userModelSubject = new Subject<UserModel[]>();
  private users: UserModel[] = [
    {firstName: 'joe', lastName: 'leboss', email: 'baba@joe.leboss', drinkPreference: 'cidre', hobbies: ['lecture', 'jeux videos']}
  ];

  /**
   * Couche d'abstraction entre données recues et traitement dans l'appli. Emet une copie des données UserModel.
   */
  emitUserModel() {
    this.userModelSubject.next(this.users.slice());
  }

  /**
   * Ajoute un utilisateur du model User dans la liste des userModel
   *
   * @param userModel
   */
  addUserModel(userModel: UserModel) {
    this.users.push(userModel);
    this.emitUserModel();
  }

}
