export class AuthService {
  isAuth: boolean = false;

  /**
   * Methode async pour simuler le temps de connexion au serveur
   */
  signIn() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          this.isAuth = true;
          resolve(true);
        }, 2000
      );
    });
  }

  /**
   * Methode non asynchrone pour simuler la deconnexion
   */
  signOut() {
    this.isAuth = false;
  }
}
