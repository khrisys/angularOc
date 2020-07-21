export class UserService {

  // Equivalent de la reception d'un tableau d'objet via une API, sous format json
  // Array utilisé avec *ngFor
  users = [
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
    const user = this.users.find((userObject) => {
      return userObject.id === id;
    });
    return user;
  }

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

  /**
   * Défini un seul user à la retraite
   */
  retireOne(index: number) {
    this.users[index].status = 'retraité';
  }

  /**
   * Défini un user comme actif
   */
  activeOne(index: number) {
    this.users[index].status = 'actif';
  }
}
