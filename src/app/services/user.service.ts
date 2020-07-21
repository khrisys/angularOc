import {Subject} from 'rxjs';

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
   * Défini un user comme actif
   * Avec la couche d'abstraction entre données recues et traitement dans l'appli, on fait emettre le Subject. Ainsi, les components qui
   * se sont souscris à ce subject verront le changement automatiquement.
   */
  activeOne(index: number) {
    this.users[index].status = 'actif';
    this.emitUserSubject();
  }
}
