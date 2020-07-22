export class UserModel {

  /**
   * Les params declarés 'public', Angular va creer des propriétés avec le nom des params dans le model User
   *
   * @param firstName
   * @param lastName
   * @param email
   * @param drinkPreference
   * @param hobbies : param optionnel noté avec le '?'. Les hobbies sont stockés sous forme d'array
   */
  constructor(public firstName: string,
              public lastName: string,
              public email: string,
              public drinkPreference: string,
              public hobbies?: string[]) {

  }
}
