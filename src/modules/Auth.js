class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', user.name);
    // console.log(' in authenticateUser localStorage.getItem token', localStorage.getItem('token'))
    // console.log(' authenticateUser localStorage.getItem username', localStorage.getItem('username'))
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    // console.log('localStorage.getItem in isUserAuthenticated', localStorage.getItem('token'))
    return localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    console.log('in deauthenticateUser')
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */
  static getToken() {
    // console.log('in getToken, token is:', localStorage.getItem('token'))
    return localStorage.getItem('token');
  }

  static getUsername() {
    // console.log('in getUsername, username is:', localStorage.getItem('username'))
    return localStorage.getItem('username');
  }

}

export default Auth;
