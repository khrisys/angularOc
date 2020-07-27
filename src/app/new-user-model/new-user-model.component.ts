import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModelService} from '../services/user-model.service';
import {Router} from '@angular/router';
import {UserModel} from '../models/User.model';

@Component({
  selector: 'app-new-user-model',
  templateUrl: './new-user-model.component.html',
  styleUrls: ['./new-user-model.component.css']
})
export class NewUserModelComponent implements OnInit {

  // Object formulaire de type Reactive est de type FormGroup (et non pas ngForm pour la methode template de Angular). Cet objet
  // correspondra au formulaire dans le template
  userModelForm: FormGroup;

  /**
   * @param formBuilder : class Angular qui permet de creer des formulaires plus facilement, des objets de type FormGroup de maniere
   * plus simple et plus lisible
   * @param userModelService : injecte le service des UserModel
   * @param router : permet la navigation vers une page voulue aores traitement des données
   */
  constructor(private formBuilder: FormBuilder, private userModelService: UserModelService, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initialise le formualire. On dit que l'objet de type FormGroup est egal au FormBuilder.group.
   *
   * Controls : Dans ce formulaire, on ajoute les controls (les attributs d'un userModel avec valeur par defaut à vides) qui seront dans le
   * formulaire.
   * Pour l'ajout dynamique des hobbies, on lui ajoute un formBuilder.array([]) vide.
   *
   * formBuilder.group() permet de creer un objet formulaire facilement (dont on peut ajouter les validators pour chaque champ, par ex).
   *
   * Validators : Pour chaque champ du formulaire, on indique avec les Validators qu'il faut que les champs soient remplis , sinon, on ne
   * pourra passoumettre le le formulaire
   */
  initForm() {
    this.userModelForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      drinkPreference: ['', Validators.required],
      hobbies: this.formBuilder.array([])
    });
  }

  /**
   * Soumission du formulaire avec le clic du bouton submit.
   *
   * Controls : Il n'y a pas besoin de passer d'argument car la methode reactive de Angular empeche de devoir creer une reference locale.
   * Pour recuperer les valeurs du formulaire, on créé d'abord une form qui recupere les values = formValue. Puis, on créé un nouvel User
   * correspondant au formValue ayant tous les attr de cet User. Pour les hobbies, comme  il se peut qu'il n'y en ait pas, il faut
   * verifier : s'il y en a un ou plusieurs, on les ajout dans le formValue, sinon, on met un array vide.
   * Ajout des valeurs du form au novel utilisateur
   * Navigation jusqu'à la page des users
   */
  onSubmitForm() {
    const formValue = this.userModelForm.value;
    const newModelUser = new UserModel(
      formValue['firstName'], formValue['lastName'], formValue['email'], formValue['drinkPreference'], formValue['hobbies'] ? formValue['hobbies'] : []
    );
    this.userModelService.addUserModel(newModelUser);
    this.router.navigate(['/user-model-list']);
  }

  /**
   * Pour des raisons de typage strict, on retourne le formArray sous forme de formArray
   */
  getHobbies(): FormArray {
    return this.userModelForm.get('hobbies') as FormArray;
  }

  /**
   * Ajout d'un hobby
   * On verifie ce control avec le Validators.required et avec une string vide. Ce qui signifie qu'à partir du moment ou j'ai créé un
   * hobby, le champ devient requis.
   * La methode getHobbies() utilisée ici permet d'avoir acces au formArray.
   */
  onAddHobby() {
    const newHobbyControl = this.formBuilder.control(null, Validators.required);
    this.getHobbies().push(newHobbyControl);
  }
}
