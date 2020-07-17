export class UserService {

  // Equivalent de la reception d'un tableau d'objet via une API, sous format json
  // Array utilisé avec *ngFor
  users = [
    {
      name: 'kiki',
      status: 'retraité'
    },
    {
      name: 'toto',
      status: 'retraité'
    },
    {
      name: 'tata',
      status: 'actif'
    }
  ];

  /**
   * Defini tous les users à la retraite
   */
  retireAll() {
    for (let user of this.users) {
      user.status = 'retraité';
    }
  }

  /**
   * Rend tous les users comme actifs
   */
  activeAll() {
    for (let user of this.users) {
      user.status = 'actif';
    }
  }

}
