import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/**
 * Attention à bien rajouter @Injectable() pour que les appels rest fonctionnent vers firebase
 */
@Injectable()
export class UserService {

  userSubject = new Subject<any[]>();

  // Equivalent de la reception d'un tableau d'objet via une API, sous format json
  // Array utilisé avec *ngFor
  // Mettre l'array 'private' permet d'empecher la amnipulation et l'acces depuis l'exteiruer de l'appli aux données. Sert pour la couche
  // d'abstraction 'Subject'. Cet array est uniquement accessible depuis l'interieur du service
  private users = [
    {
      id: 1,
      name: 'kiki',
      status: 'retraité'
    },
    {
      id: 2,
      name: 'toto',
      status: 'retraité'
    },
    {
      id: 3,
      name: 'tata',
      status: 'actif'
    }
  ];

  constructor(private httpClient: HttpClient) {
  }


  /**
   * Retourne l'objet User par son id, id qui est passé en argument dans l'url
   *
   * @param id
   */
  getUserById(id: number) {
    const utilisateur = this.users.find((userObject) => {
      return userObject.id === id;
    });
    return utilisateur;
  }

  /**
   * Permet que le Subject emette la liste des users. C'est la couche d'abstraction pour l'utilisation des données recues depuis un
   * fichier json, d'une API, etc. Ca va permettre d'acceder aux données depuis l'exterieur. C'est le concept du "Ouvert à
   * l'extension/fermé à la modif"
   *
   * la methode 'next()' force le subject à emettre ce qu'on lui passe comme argument
   * la methode 'slice()' permet de faire une copie du tableau d'objet 'users' privé
   */
  emitUserSubject() {
    this.userSubject.next(this.users.slice());
  }


  // ===============================================================
  // Methodes métier
  // ==============================================================
  /**
   * Defini tous les users à la retraite
   * Avec la couche d'abstraction entre données recues et traitement dans l'appli, on fait emettre le Subject. Ainsi, les components qui
   * se sont souscris à ce subject verront le changement automatiquement.
   */
  retireAll() {
    for (let user of this.users) {
      user.status = 'retraité';
    }
    this.emitUserSubject();
  }

  /**
   * Rend tous les users comme actifs
   * Avec la couche d'abstraction entre données recues et traitement dans l'appli, on fait emettre le Subject. Ainsi, les components qui
   * se sont souscris à ce subject verront le changement automatiquement.
   */
  activeAll() {
    for (let user of this.users) {
      user.status = 'actif';
    }
    this.emitUserSubject();
  }

  /**
   * Défini un seul user à la retraite
   * Avec la couche d'abstraction entre données recues et traitement dans l'appli, on fait emettre le Subject. Ainsi, les components qui
   * se sont souscris à ce subject verront le changement automatiquement.
   */
  retireOne(index: number) {
    this.users[index].status = 'retraité';
    this.emitUserSubject();
  }

  /**
   * Défini un user précis comme actif
   * Avec la couche d'abstraction entre données recues et traitement dans l'appli, on fait emettre le Subject. Ainsi, les components qui
   * se sont souscris à ce subject verront le changement automatiquement.
   *
   * @param index : index de l'user dans la liste json d'objets User
   */
  activeOne(index: number) {
    this.users[index].status = 'actif';
    this.emitUserSubject();
  }

  /**
   * Methode d'edition permettant d'ajouter un user à la liste des users
   *
   * @param name
   * @param status
   */
  addUser(name: string, status: string) {
    const userObject = {id: 0, name: '', status: ''};

    // On recupere l'id du dernier element de la liste (avec le length -1) ausuel on rajoute 1 pour incrementer l'id
    userObject.id = this.users[(this.users.length - 1)].id + 1;
    userObject.name = name;
    userObject.status = status;
    this.users.push(userObject);
    // On emet le Subject qui fait appel à la couche d'abstraction des données
    this.emitUserSubject();
  }


  // ===============================================================
  // Appels vers bdd firebase
  // ==============================================================
  /**
   * Methode permettant d'enregistrer des users dans firebase
   * On utilise la methode put() pour ecraser les données users à chaque clic sur le bouton. Si on utilise la methode post(), ca
   * enregistrera en bdd à chaque clic l'ensemble des users à enregistrer.
   * L'url du serveur doit etre complété avec ce qu'on veut enregistrer (ici, les users), suivi de .json. C'est la convention de
   * firebase pour le format de fichier json. Les methodes post() et put() retournent un Observable, elle ne fait pas d'appel à elle toute
   * seule.
   * C'est en y souscrivant que l'appel est lancé.
   * Dans la methode subscribe, on prevoit les cas ou ca fonctionne et ou ca fonctionne pas.
   */
  saveUsersToServer() {
    this.httpClient.put('https://angularoc-dbb41.firebaseio.com/users.json', this.users).subscribe(() => {
      console.log('enregistrement terminé dans firebase !');
    }, (error) => {
      console.log('erreur d\'enregistrement dans firebase !');
    });
  }

  /**
   * Methode permettant de recuperer la liste des users depuis la bdd firebase
   * Comme pour  post()  et  put() , la méthode get() retourne un Observable, mais puisqu'ici, vous allez recevoir des données, TypeScript
   * a besoin de savoir de quel type elles seront (l'objet retourné est d'office considéré comme étant un Object).  Vous devez donc, dans
   * ce cas précis, ajouter  <any[]>  pour dire que vous allez recevoir un array de type  any , et que donc TypeScript peut traiter cet
   * objet comme un array : si vous ne le faites pas, TypeScript vous dira qu'un array ne peut pas être redéfini comme Object.
   */
  getAppareilsFromServer() {
    this.httpClient
        .get<any[]>('https://angularoc-dbb41.firebaseio.com/users.json')
        .subscribe(
          (response) => {
            this.users = response;
            this.emitUserSubject();
          },
          (error) => {
            console.log('Erreur ! : ' + error);
          }
        );
  }
}
