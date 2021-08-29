import decode from 'jwt-decode';

class Auth {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
      console.log('log in check')
    const token = this.getToken();
    // console.log(token)
    // If there is a token and it's not expired, return `true`
    if(token){
        let loggedIn= token && !this.isTokenExpired(token) ? true : false;
        return loggedIn;
    }
    else{ 
        return null
    }
    
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('jwt-id');
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('jwt-id');
  }

  login(token) {
      
    localStorage.setItem('jwt-id', token);
  
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('jwt-id');
    window.location.reload();
  }
}

export default new Auth();
