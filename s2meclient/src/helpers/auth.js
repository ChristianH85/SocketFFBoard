import decode from 'jwt-decode';
// import {useHistory} from 'react-router-dom'
// const history = useHistory()
class Auth {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
      console.log('log in check')
    const token = this.getToken();
    console.log(token)
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
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('jwt-id');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
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
